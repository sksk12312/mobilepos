import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem as ServiceCartItem, Restaurant } from '../cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ServiceCartItem[] = [];
  restaurant: Restaurant | null = null;
  specialInstructions = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart items
    this.cartService.cartItems$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.cartItems = items;
    });

    // Subscribe to current restaurant
    this.cartService.currentRestaurant$.pipe(takeUntil(this.destroy$)).subscribe(restaurant => {
      this.restaurant = restaurant;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get taxes(): number {
    return this.subtotal * 0.134; // example tax rate
  }

  get total(): number {
    return this.subtotal + this.taxes;
  }

  increaseQty(item: ServiceCartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQty(item: ServiceCartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(item: ServiceCartItem) {
    this.cartService.removeItem(item.id);
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  goToPayment() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/payment']);
    }
  }
}
