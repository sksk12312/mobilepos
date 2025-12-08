import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, DecimalPipe } from '@angular/common';

interface ConfirmItem { name: string; price: number; qty: number; image: string; }

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  orderId = 'A123BC45D';
  paidAtDisplay = new Date().toLocaleString();
  restaurant = { name: 'The Burger Joint', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxUwRi9Dv2jT0Wt3mg-KbyIg4tFWdmS0cU526LBPkf16hhTLb8Isj7NBIkvmDmoz2jVAfE7wvcwHMeDeUUkGZkLERI9UtBM7T_DWZoZIIDwSppILrOBf8lJNF49JFXEULcAdDhEdrtWUJbLBmbJ_za39wX4r5x_kfi0Ls6Rqu8F9jrG30ayVGyFJrPbX1GozCh7UzFb6S1keyOHq4kyS98ASsKkQ3zSMKs95-6yarB6YVxu3qKnUvinwGo54a48tpdmOHqp8098w'};

  // Items: in real app get from CartService or backend.
  orderItems: ConfirmItem[] = [
    { name: 'Classic Cheeseburger', price: 12.99, qty: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWIuVsnQ8-amhKTZRXclG7i6eIGA4Tag1wL3DhT8wMF0EmEmohPx-gQUSs7XexTQ4nfnHBIUgKfy-9ZnUd5uNDnl-RtnUvqfqWqLysu2e_5cQ7rB6_YwGuw9GfGV7btlbnmsVa24HaSU-Otu9VnbB2hmwJCaG20SMxB-1SFNgUUjv5QgZvAJ-UII2T4a2ZaCOADqWb5KlnGAcJf2wCNc0NusCVsLszmd_tVJczLH3yVnuUrYFrmjrojTOuNnLvSg9fcDocc9vTyw' },
    { name: 'Crispy French Fries', price: 4.50, qty: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtxFYPih2N6icQ_5atXWC_QwWavULHhv4SCrbs1kFiZK0YZKdGxHONJYnNogzxcSQf3-MM0p9o23_q41ZhRc4DZBtHuguzLU_Jlw0oV8r-GuHJmPriGBDtQZB-kQKtiw6T_1Fa0wFgJQGXrIPYApecVDW8Nwmkfx4xStnDTYYm4L09wJSIZ0QeApohYHavQ6uKXzEXB3Gru8fnjHrGMrkHC7_EjEtS2yg7uNI3DciogoGO_q4G6vfA7yiJoiYByMcCMq5An0bpUw' },
    { name: 'Vanilla Milkshake', price: 6.00, qty: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ2iixVSgF5j5cTjhHXgE9Hs-FrBD0HDAywhzwE01KSRMMmTixeSz45n79fFVdFIsMhBoHxJbp6IkX4yc2X8Rj-Duc3vhB-PMqPje66ZuzV2ygLE_opcbkQD3uVOCU95-hu9BE12k2d7keeDu_AEtTBykTWjksKTcNjKHxtkSRPezHLBaR1Nlxo-OWuOlW4Ies9S_aOpdvbEgTbROsw-422EMHVWU9dMNeQMvFaLOzSrjw-ZiqxyrINBc0NG3R2ozGp_LPdCpJsQ' }
  ];

  deliveryFee = 5.00;
  tip = 5.60;
  paymentMethod = 'Visa **** 1234';

  constructor(private router: Router) {
    // Pull orderId & paidAt passed in state (from payment component), if available
    const st: any = history.state;
    if (st && st.orderId) {
      this.orderId = st.orderId;
      this.paidAtDisplay = new Date(st.paidAt || Date.now()).toLocaleString();
      if (st.paidAmount) {
        // optionally show amounts from state
      }
    }
  }

  get subtotal(): number {
    return this.orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  }

  get taxes(): number {
    return +(this.subtotal * 0.125).toFixed(2); // example 12.5%
  }

  get total(): number {
    return +(this.subtotal + this.taxes + this.deliveryFee + this.tip).toFixed(2);
  }

  goBack() {
    // go to menu by default
    this.router.navigate(['/menu']);
  }

  orderAgain() {
    // naive behavior: route to menu to start over
    this.router.navigate(['/menu']);
  }
}
