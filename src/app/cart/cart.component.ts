import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { SessionService } from '../services/session.service';
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
  cartItems: CartItem[] = [];
  specialInstructions = '';
  waiterName = '';
  selectedTable: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private cartService: CartService, private sessionService: SessionService) {}

  ngOnInit() {
    // Load session data
    this.waiterName = this.sessionService.getWaiterName();
    this.selectedTable = this.sessionService.getSelectedTable();

    // Subscribe to cart items
    this.cartService.itemsObservable.pipe(takeUntil(this.destroy$)).subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  get taxes(): number {
    return this.subtotal * 0.134; // example tax rate
  }

  get total(): number {
    return this.subtotal + this.taxes;
  }

  increaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.qty + 1);
  }

  decreaseQty(item: CartItem) {
    if (item.qty > 1) {
      this.cartService.updateQuantity(item.id, item.qty - 1);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.id);
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  goToTableSelect() {
    this.router.navigate(['/select-table']);
  }

  goToPayment() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/payment']);
    }
  }
}
