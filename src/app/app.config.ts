import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CartService } from './services/cart.service';
import { SessionService } from './services/session.service';
import { AuthGuard } from './auth.guard';
import { RoutingGuardService } from './routing-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideAnimations(),
    provideHttpClient(),
    // Services
    AuthService,
    CartService,
    SessionService,
    AuthGuard,
    RoutingGuardService
  ]
};
