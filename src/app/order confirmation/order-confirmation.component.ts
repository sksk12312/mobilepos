// src/app/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartSnapshot } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.html',
  styleUrls: ['./order-confirmation.scss']
})
export class OrderConfirmationComponent implements OnInit {
  lastOrder?: CartSnapshot;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.lastOrder = this.cartService.getCartSnapshot();
    // Optionally clear cart after confirming
    // this.cartService.clearCart();
  }
}
 