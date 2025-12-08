import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
  instructions?: string[];
}

@Injectable()
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>([]);
  public readonly cartCount$ = this.cart$.pipe(map(items => items.reduce((s, it) => s + (it.quantity ?? 1), 0)));

  getCartSnapshot(): CartItem[] {
    return this.cart$.value;
  }

  addToCart(item: CartItem) {
    const current = [...this.cart$.value];
    const found = current.find(i => i.id === item.id);
    if (found) {
      found.quantity = (found.quantity ?? 1) + (item.quantity ?? 1);
    } else {
      current.push({ ...item, quantity: item.quantity ?? 1 });
    }
    this.cart$.next(current);
  }

  clearCart() {
    this.cart$.next([]);
  }

  removeAt(index: number) {
    const current = [...this.cart$.value];
    current.splice(index, 1);
    this.cart$.next(current);
  }
}
