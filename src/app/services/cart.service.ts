// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  notes?: string;
  image?: string;
  instructions?: string[];
}

export interface CartSnapshot {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const STORAGE_KEY = 'mobilepos_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  public itemsObservable = this.itemsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (_) { /* ignore */ }
    this.itemsSubject.next([...this.items]);
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.items = raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      this.items = [];
    }
    this.itemsSubject.next([...this.items]);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  addItem(item: Omit<CartItem, 'qty'>, qty = 1) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...item, qty });
    }
    this.persist();
  }

  updateQuantity(id: string, qty: number) {
    const it = this.items.find(i => i.id === id);
    if (!it) return;
    it.qty = Math.max(0, qty);
    this.items = this.items.filter(i => i.qty > 0);
    this.persist();
  }

  removeItem(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.persist();
  }

  clearCart() {
    this.items = [];
    this.persist();
  }

  getSubtotal(): number {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  getTax(amount: number, rate = 0.10): number {
    return parseFloat((amount * rate).toFixed(2));
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    return parseFloat((subtotal + this.getTax(subtotal)).toFixed(2));
  }

  // return a snapshot used by confirmation page
  getCartSnapshot(): CartSnapshot {
    const subtotal = this.getSubtotal();
    const tax = this.getTax(subtotal);
    const total = parseFloat((subtotal + tax).toFixed(2));
    return {
      items: this.getItems(),
      subtotal,
      tax,
      total
    };
  }
}
