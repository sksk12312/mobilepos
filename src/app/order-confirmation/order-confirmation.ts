import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-confirmation.html',
  styleUrls: ['./order-confirmation.scss']
})
export class OrderConfirmationComponent {
  lastOrder: any[] = [];

  constructor(private cartService: CartService) {
    this.lastOrder = cartService.getCartSnapshot();
  }
}
