import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'select-outlet', loadComponent: () => import('./outlets/select-outlet.component').then(m => m.SelectOutletComponent) },
  { path: 'dining-experience', loadComponent: () => import('./dining-experience/dining-experience.component').then(m => m.DiningExperienceComponent) },
  { path: 'setup-table', loadComponent: () => import('./setuptable/setup-table.component').then(m => m.SetupTableComponent) },
  { path: 'select-table', loadComponent: () => import('./select-table/select-table.component').then(m => m.SelectTableComponent) },
  { path: 'menu', loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) },
  { path: 'customize-item', loadComponent: () => import('./customize-pizza/customize-item.component').then(m => m.CustomizeItemComponent) },
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'payment', loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent) },
  { path: 'order-confirmation', loadComponent: () => import('./order confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent) },
  { path: '**', redirectTo: 'login' }
];
