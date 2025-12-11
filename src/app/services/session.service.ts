    import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private waiterNameSubject = new BehaviorSubject<string>('');
  private selectedTableSubject = new BehaviorSubject<number | null>(null);
  private selectedOutletSubject = new BehaviorSubject<string>('');

  public waiterName$ = this.waiterNameSubject.asObservable();
  public selectedTable$ = this.selectedTableSubject.asObservable();
  public selectedOutlet$ = this.selectedOutletSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const waiter = localStorage.getItem('session_waiter_name');
    const table = localStorage.getItem('session_selected_table');
    const outlet = localStorage.getItem('session_selected_outlet');
    if (waiter) this.waiterNameSubject.next(waiter);
    if (table) this.selectedTableSubject.next(parseInt(table, 10));
    if (outlet) this.selectedOutletSubject.next(outlet);
  }

  private persist() {
    const waiter = this.waiterNameSubject.value;
    const table = this.selectedTableSubject.value;
    const outlet = this.selectedOutletSubject.value;
    if (waiter) localStorage.setItem('session_waiter_name', waiter);
    if (table) localStorage.setItem('session_selected_table', table.toString());
    if (outlet) localStorage.setItem('session_selected_outlet', outlet);
  }

  setWaiterName(name: string) {
    this.waiterNameSubject.next(name);
    this.persist();
  }

  getWaiterName(): string {
    return this.waiterNameSubject.value;
  }

  setSelectedTable(tableNumber: number) {
    this.selectedTableSubject.next(tableNumber);
    this.persist();
  }

  getSelectedTable(): number | null {
    return this.selectedTableSubject.value;
  }

  setSelectedOutlet(outletName: string) {
    this.selectedOutletSubject.next(outletName);
    this.persist();
  }

  getSelectedOutlet(): string {
    return this.selectedOutletSubject.value;
  }

  clear() {
    this.waiterNameSubject.next('');
    this.selectedTableSubject.next(null);
    this.selectedOutletSubject.next('');
    localStorage.removeItem('session_waiter_name');
    localStorage.removeItem('session_selected_table');
    localStorage.removeItem('session_selected_outlet');
  }
}
