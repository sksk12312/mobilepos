import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface RoutingState {
  isLoggedIn: boolean;
  selectedOutlet: any | null;
  selectedDiningArea: string | null;
  selectedTable: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class RoutingGuardService {
  private routingState = new BehaviorSubject<RoutingState>({
    isLoggedIn: false,
    selectedOutlet: null,
    selectedDiningArea: null,
    selectedTable: null
  });

  public routingState$ = this.routingState.asObservable();

  constructor(private router: Router) {
    this.loadRoutingState();
  }

  /**
   * Mark user as logged in after successful authentication
   */
  setLoggedIn() {
    const current = this.routingState.value;
    this.routingState.next({ ...current, isLoggedIn: true });
    this.saveRoutingState();
  }

  /**
   * Set selected outlet and validate can proceed
   */
  setSelectedOutlet(outlet: any): boolean {
    if (!this.routingState.value.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    const current = this.routingState.value;
    this.routingState.next({ ...current, selectedOutlet: outlet });
    this.saveRoutingState();
    return true;
  }

  /**
   * Set dining area selection
   */
  setSelectedDiningArea(area: string): boolean {
    if (!this.routingState.value.isLoggedIn || !this.routingState.value.selectedOutlet) {
      this.router.navigate(['/login']);
      return false;
    }
    const current = this.routingState.value;
    this.routingState.next({ ...current, selectedDiningArea: area });
    this.saveRoutingState();
    return true;
  }

  /**
   * Set table selection
   */
  setSelectedTable(table: any): boolean {
    if (
      !this.routingState.value.isLoggedIn ||
      !this.routingState.value.selectedOutlet ||
      !this.routingState.value.selectedDiningArea
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    const current = this.routingState.value;
    this.routingState.next({ ...current, selectedTable: table });
    this.saveRoutingState();
    return true;
  }

  /**
   * Verify user can access menu
   */
  canAccessMenu(): boolean {
    const state = this.routingState.value;
    return !!(state.isLoggedIn && state.selectedOutlet && state.selectedDiningArea && state.selectedTable);
  }

  /**
   * Get current routing state
   */
  getRoutingState(): RoutingState {
    return this.routingState.value;
  }

  /**
   * Reset routing state (logout)
   */
  resetRoutingState() {
    this.routingState.next({
      isLoggedIn: false,
      selectedOutlet: null,
      selectedDiningArea: null,
      selectedTable: null
    });
    localStorage.removeItem('routingState');
    this.router.navigate(['/login']);
  }

  /**
   * Save routing state to localStorage
   */
  private saveRoutingState() {
    localStorage.setItem('routingState', JSON.stringify(this.routingState.value));
  }

  /**
   * Load routing state from localStorage
   */
  private loadRoutingState() {
    const stored = localStorage.getItem('routingState');
    if (stored) {
      try {
        const state = JSON.parse(stored);
        this.routingState.next(state);
      } catch (e) {
        console.error('Error loading routing state:', e);
      }
    }
  }
}
