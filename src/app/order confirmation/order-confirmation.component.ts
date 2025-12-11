import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartSnapshot } from '../services/cart.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId!: string;
  paymentMethod!: string;
  orderTime!: string;
  lastOrder?: CartSnapshot;
  waiterName = '';
  selectedTable: number | null = null;
  restaurantName = 'Outlet 1';

  constructor(private router: Router, private cartService: CartService, private sessionService: SessionService) {
    this.orderId = '';
    this.paymentMethod = '';
    this.orderTime = '';
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.orderId = navigation.extras.state['orderId'] || '';
      this.paymentMethod = navigation.extras.state['paymentMethod'] || 'card';
      // Get cart snapshot from navigation state
      if (navigation.extras.state['cartSnapshot']) {
        this.lastOrder = navigation.extras.state['cartSnapshot'];
      }
    }
  }

  ngOnInit(): void {
    // If no cart snapshot from navigation, try to get from service
    if (!this.lastOrder) {
      this.lastOrder = this.cartService.getCartSnapshot();
    }
    this.waiterName = this.sessionService.getWaiterName();
    this.selectedTable = this.sessionService.getSelectedTable();
    this.restaurantName = this.sessionService.getSelectedOutlet() || 'Outlet 1';
    this.orderTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  orderAgain() {
    this.cartService.clearCart();
    this.sessionService.clear();
    this.router.navigate(['/outlets']);
  }

  goToTableSelect() {
    this.router.navigate(['/select-table']);
  }
}



 