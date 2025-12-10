// src/app/cart/cart.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  private sub?: Subscription;

  constructor(public cart: CartService) {}

  ngOnInit() {
    this.sub = this.cart.itemsObservable.subscribe((list: CartItem[]) => {
      this.items = list;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  increase(item: CartItem) {
    this.cart.updateQuantity(item.id, item.qty + 1);
  }

  decrease(item: CartItem) {
    this.cart.updateQuantity(item.id, item.qty - 1);
  }

  remove(item: CartItem) {
    this.cart.removeItem(item.id);
  }

  get subtotal() {
    return this.cart.getSubtotal();
  }

  get tax() {
    return this.cart.getTax(this.subtotal);
  }

  get total() {
    return this.cart.getTotal();
  }
}
