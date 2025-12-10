import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RoutingGuardService } from './routing-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private guardService: RoutingGuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const path = state.url;
    const routingState = this.guardService.getRoutingState();

    // Allow login page always
    if (path === '/login') {
      return true;
    }

    // Require login for all other pages
    if (!routingState.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Outlet selection requires login
    if (path === '/select-outlet') {
      return true;
    }

    // Dining area selection requires outlet selection
    if (path === '/dining-experience') {
      if (!routingState.selectedOutlet) {
        this.router.navigate(['/select-outlet']);
        return false;
      }
      return true;
    }

    // Table selection requires dining area
    if (path === '/select-table' || path === '/setup-table') {
      if (!routingState.selectedDiningArea) {
        this.router.navigate(['/dining-experience']);
        return false;
      }
      return true;
    }

    // Menu requires complete setup
    if (path === '/menu' || path === '/customize-item' || path === '/cart' || path === '/payment') {
      if (!this.guardService.canAccessMenu()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

    // Order confirmation
    if (path === '/order-confirmation') {
      return true;
    }

    return true;
  }
}
