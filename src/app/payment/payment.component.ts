import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  // In a real app, amount should come from CartService; here it's passed or set statically
  amount = 42.09;               // example amount; replace with dynamic value
  description = 'Order payment';

  cardName = '';
  cardNumber = '';
  expiry = '';
  cvc = '';
  processing = false;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/cart']);
  }

  pay() {
    if (!this.cardName || !this.cardNumber || !this.expiry || !this.cvc) {
      alert('Please fill card details.');
      return;
    }

    // simulate processing
    this.processing = true;
    setTimeout(() => {
      this.processing = false;

      // Generate a sample order id and timestamp (in real app get from backend)
      const orderId = 'A' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const timestamp = new Date().toISOString();

      // navigate to order confirmation and pass info via state
      this.router.navigate(['/order-confirmation'], {
        state: { orderId, paidAmount: this.amount, paidAt: timestamp }
      });
    }, 1000); // simulate 1s processing
  }
}
