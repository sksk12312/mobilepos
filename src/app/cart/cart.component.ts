import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  qty: number;
  image: string;
  note?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  restaurant = {
    name: 'The Burger Joint',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaY6x86geoDeAIYU6Gccu-1u-FuGJYT7TIfGobygrTMJll4s2iYh3pxacxvlDdwQ2VMINOgRXZn_mCHA4gv97tABEHwkPVolGinWQPEdSmJvScRs5_wHdFrR06XT0IfvPu45KxYxIqHFnPVEtGFahLiTg66fkEC2y_XYyqs7ZUX69G5Y2beKEI1_T3Q3amXX6E9xAiqMAw4WGTxywpGzAiEtuT1Md9mY7pfF--DGqXuZnphXcq2xGUswGDLyhFBmyFR2KiOKBjGw'
  };

  cartItems: CartItem[] = [
    {
      name: 'Classic Cheeseburger',
      price: 12.99,
      qty: 1,
      note: 'No onions, extra pickles',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAcujImii4ZMMBKNKF69kRraxEBiIy_HGBpUb8x835A1zQlO2BAh0DXHEqo1IihO1t-HZgll_bhEIbgtb9OdSLXayyAVwRp-4kL8KSHBP8RofP-DgCtt8CV8aZFFOMXAsFdc-Mczi_Xis1JJk-zol1v34fMBDWC3093xIBiCgmPqTWI7bh3oC3WxY1t0XGI67fhBTpKlBaCURU64_Yd6ws_Rv_kVm6TIJLk92a7CpAS6_rOD5IxGRfL3i7Fdph6fdYdI5A9giKFgA'
    },
    {
      name: 'Large Fries',
      price: 4.50,
      qty: 1,
      note: 'Extra Crispy',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB9kYodD1n69kSPYwKSk8iyyhwoTZl9hstVU06e12FvgE6Fa5-H26hq4npZYKYdyVGFWSb9qiuNjWMITubE5ddkkVwMBVZZ5HcZmJ8oGdQQjCoh7cWK5TyZiqSlZc5Kxy3cyLtetmPym2aOVOtaalyBBSw7NoQmyBXGWvmXXwgyfZkMqzUu46Go35Fvj9kq93ihvmqCE-8-MN-5CFOOoG5wlzfp22Gor-yE_w67Wy-Fmhj3Qi4OcjcFMkMEwEtCrriKBIhlhpznJw'
    }
  ];

  specialInstructions = '';

  constructor(private router: Router) {}

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
    item.qty++;
  }

  decreaseQty(item: CartItem) {
    if (item.qty > 1) item.qty--;
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  goToPayment() {
    console.log('Proceeding to payment with total:', this.total);
    this.router.navigate(['/payment']);
  }
}
