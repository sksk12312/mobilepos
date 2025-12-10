import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: number;
  status: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public currentRestaurant = new BehaviorSubject<Restaurant | null>(null);
  
  public cartItems$ = this.cartItems.asObservable();
  public currentRestaurant$ = this.currentRestaurant.asObservable();
  public cartCount$ = this.cartItems$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  constructor() {
    this.loadCartFromStorage();
  }

  setRestaurant(restaurant: Restaurant) {
    this.currentRestaurant.next(restaurant);
    localStorage.setItem('currentRestaurant', JSON.stringify(restaurant));
  }

  getRestaurant(): Restaurant | null {
    return this.currentRestaurant.value;
  }

  addToCart(item: CartItem, restaurant: Restaurant): boolean {
    const current = this.currentRestaurant.value;

    // If no restaurant is set, set it
    if (!current) {
      this.setRestaurant(restaurant);
      this.addItemToCart(item);
      return true;
    }

    // If same restaurant, add item
    if (current.id === restaurant.id) {
      this.addItemToCart(item);
      return true;
    }

    // Different restaurant - return false to trigger warning dialog
    return false;
  }

  private addItemToCart(item: CartItem) {
    const items = this.cartItems.value;
    const existingItem = items.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cartItems.next([...items]);
    this.saveCartToStorage();
  }

  switchRestaurantAndAddItem(item: CartItem, newRestaurant: Restaurant) {
    this.clearCart();
    this.setRestaurant(newRestaurant);
    this.addItemToCart(item);
  }

  updateQuantity(itemId: string, quantity: number) {
    const items = this.cartItems.value;
    const item = items.find(i => i.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(itemId);
      } else {
        this.cartItems.next([...items]);
        this.saveCartToStorage();
      }
    }
  }

  removeItem(itemId: string) {
    const items = this.cartItems.value.filter(i => i.id !== itemId);
    this.cartItems.next(items);
    this.saveCartToStorage();

    // If cart is empty, clear restaurant
    if (items.length === 0) {
      this.currentRestaurant.next(null);
      localStorage.removeItem('currentRestaurant');
    }
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cartItems.next([]);
    this.currentRestaurant.next(null);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('currentRestaurant');
  }

  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
  }

  private loadCartFromStorage() {
    const stored = localStorage.getItem('cartItems');
    const storedRestaurant = localStorage.getItem('currentRestaurant');
    
    if (stored) {
      try {
        this.cartItems.next(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }

    if (storedRestaurant) {
      try {
        this.currentRestaurant.next(JSON.parse(storedRestaurant));
      } catch (e) {
        console.error('Error loading restaurant:', e);
      }
    }
  }
}
