import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customize-item',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './customize-item.component.html',
  styleUrls: ['./customize-item.component.scss']
})
export class CustomizeItemComponent {

  // Item Data (can later come from backend)
  itemName = 'Margherita Pizza';
  itemDescription = 'Classic pizza with tomato sauce, mozzarella, and basil.';
  itemImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA';

  selectedCrust = 'thin';

  toppings = [
    { name: 'Pepperoni', price: 1.50, selected: false },
    { name: 'Mushrooms', price: 1.00, selected: false },
    { name: 'Extra Cheese', price: 2.00, selected: true },
    { name: 'Onions', price: 0.75, selected: false },
  ];

  basePrice = 14.00;

  qty = 1;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/menu']);
  }

  increaseQty() {
    this.qty++;
  }

  decreaseQty() {
    if (this.qty > 1) this.qty--;
  }

  get totalPrice(): number {
    const crustPrice = this.selectedCrust === 'stuffed' ? 3 : 0;
    const toppingsPrice = this.toppings
      .filter(t => t.selected)
      .reduce((sum, t) => sum + t.price, 0);

    return (this.basePrice + crustPrice + toppingsPrice) * this.qty;
  }

  addToCart() {
    console.log('Added item:', {
      crust: this.selectedCrust,
      toppings: this.toppings.filter(t => t.selected),
      qty: this.qty,
      total: this.totalPrice,
    });

    this.router.navigate(['/cart']);
  }
}
