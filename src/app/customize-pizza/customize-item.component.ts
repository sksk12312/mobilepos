import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { SessionService } from '../services/session.service';

interface MenuItem {
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-customize-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customize-item.component.html',
  styleUrls: ['./customize-item.component.scss']
})
export class CustomizeItemComponent implements OnInit {

  // Item Data
  itemName = 'Margherita Pizza';
  itemDescription = 'Classic pizza with tomato sauce, fresh mozzarella, and basil. Customize it your way!';
  itemImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA';
  basePrice = 14.00;
  itemId = '';
  isFavorite = false;
  waiterName = '';
  selectedTable: number | null = null;

  selectedCrust = 'thin';
  crusts = [
    { id: 'thin', name: 'Thin Crust', price: 0, included: true },
    { id: 'stuffed', name: 'Cheese-Stuffed Crust', price: 3.00, included: false }
  ];

  toppings = [
    { name: 'Pepperoni', price: 1.50, selected: false },
    { name: 'Mushrooms', price: 1.00, selected: false },
    { name: 'Extra Cheese', price: 2.00, selected: true },
    { name: 'Onions', price: 0.75, selected: false },
  ];

  qty = 1;

  constructor(private router: Router, private cartService: CartService, private sessionService: SessionService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['item']) {
      const item = navigation.extras.state['item'] as MenuItem;
      this.itemName = item.name;
      this.itemImage = item.image;
      this.basePrice = item.price;
      this.itemId = item.id || '';
      this.itemDescription = this.getDescription(item.name);
    }
  }

  ngOnInit() {
    // Load session data
    this.waiterName = this.sessionService.getWaiterName();
    this.selectedTable = this.sessionService.getSelectedTable();
  }

  getDescription(itemName: string): string {
    const descriptions: { [key: string]: string } = {
      'Margherita Pizza': 'Classic pizza with tomato sauce, fresh mozzarella, and basil. Customize it your way!',
      'Pepperoni Pizza': 'Loaded with savory pepperoni slices and stretchy cheese. Make it your own!',
      'Veggie Pizza': 'Packed with fresh vegetables and our special sauce. Customize with your favorite toppings!'
    };
    return descriptions[itemName] || 'Delicious pizza. Customize it your way!';
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  goToTableSelect() {
    this.router.navigate(['/select-table']);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  increaseQty() {
    this.qty++;
  }

  decreaseQty() {
    if (this.qty > 1) this.qty--;
  }

  get crustPrice(): number {
    const crust = this.crusts.find(c => c.id === this.selectedCrust);
    return crust?.price || 0;
  }

  get toppingsPrice(): number {
    return this.toppings
      .filter(t => t.selected)
      .reduce((sum, t) => sum + t.price, 0);
  }

  get totalPrice(): number {
    return (this.basePrice + this.crustPrice + this.toppingsPrice) * this.qty;
  }

  addToCart() {
    const cartItem: Omit<CartItem, 'qty'> = {
      id: this.itemId || `pizza-${Math.random()}`,
      name: this.itemName,
      price: this.basePrice + this.crustPrice + this.toppingsPrice,
      image: this.itemImage,
      notes: `Crust: ${this.selectedCrust} | Toppings: ${this.toppings.filter(t => t.selected).map(t => t.name).join(', ')}`
    };
    this.cartService.addItem(cartItem, this.qty);
    this.router.navigate(['/cart']);
  }
}
