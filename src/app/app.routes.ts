import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'login', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'select-outlet', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./outlets/select-outlet.component').then(m => m.SelectOutletComponent) 
  },
  { 
    path: 'dining-experience', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./dining-experience/dining-experience.component').then(m => m.DiningExperienceComponent) 
  },
  { 
    path: 'customer-details', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) 
  },
  { 
    path: 'setup-table', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./setuptable/setup-table.component').then(m => m.SetupTableComponent) 
  },
  { 
    path: 'select-table', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./select-table/select-table.component').then(m => m.SelectTableComponent) 
  },
  { 
    path: 'menu', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) 
  },
  { 
    path: 'customize-item', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./customize-pizza/customize-item.component').then(m => m.CustomizeItemComponent) 
  },
  { 
    path: 'cart', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) 
  },
  { 
    path: 'payment', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent) 
  },
  { 
    path: 'order-confirmation', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./order confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent) 
  },
  { path: '**', redirectTo: 'login' }
];
