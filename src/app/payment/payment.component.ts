import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartSnapshot } from '../services/cart.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentMethod: 'card' | 'cash' = 'card';
  cartSnapshot: CartSnapshot | null = null;
  processing = false;
  error = '';
  waiterName = '';
  selectedTable: number | null = null;

  // Card details
  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvc = '';

  constructor(private router: Router, private cartService: CartService, private sessionService: SessionService) {}

  ngOnInit() {
    this.cartSnapshot = this.cartService.getCartSnapshot();
    this.waiterName = this.sessionService.getWaiterName();
    this.selectedTable = this.sessionService.getSelectedTable();
  }

  goBack() {
    this.router.navigate(['/cart']);
  }

  goToTableSelect() {
    this.router.navigate(['/select-table']);
  }

  selectPaymentMethod(method: 'card' | 'cash') {
    this.paymentMethod = method;
    this.error = '';
  }

  processPayment() {
    if (!this.cartSnapshot) {
      this.error = 'Cart data not found';
      return;
    }

    if (this.paymentMethod === 'card') {
      if (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCvc) {
        this.error = 'Please fill in all card details';
        return;
      }
      if (this.cardNumber.replace(/\s/g, '').length < 13) {
        this.error = 'Invalid card number';
        return;
      }
    }

    this.processing = true;
    this.error = '';

    setTimeout(() => {
      this.processing = false;
      const orderId = 'ORD' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      this.router.navigate(['/order-confirmation'], {
        state: { 
          orderId, 
          totalAmount: this.cartSnapshot?.total,
          paymentMethod: this.paymentMethod,
          cartSnapshot: this.cartSnapshot
        }
      });
      
      this.cartService.clearCart();
    }, 1500);
  }
}

