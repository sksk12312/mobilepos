import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RoutingGuardService } from '../routing-guard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  error = '';

  constructor(private router: Router, private authService: AuthService, private guardService: RoutingGuardService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      this.authService.login(this.email, this.password);
      this.guardService.setLoggedIn();
      this.isLoading = false;
      this.router.navigate(['/select-outlet']);
    }, 1500);
  }

  navigateToDashboard() {
    this.authService.login('demo@example.com', 'demo123');
    this.guardService.setLoggedIn();
    this.router.navigate(['/dashboard']);
  }
}
