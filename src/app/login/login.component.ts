import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingGuardService } from '../routing-guard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  passwordVisible = false;

  constructor(private router: Router, private guardService: RoutingGuardService) {}

  goBack() {
    this.router.navigate(['/']);
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    console.log('Logging in with:', this.email, this.password);
    
    // Mark user as logged in
    this.guardService.setLoggedIn();
    
    // Navigate to outlet selection (next step in correct order)
    this.router.navigate(['/select-outlet']);
  }

  // Social login methods
  loginWithGoogle() {
    console.log('Logging in with Google');
    this.guardService.setLoggedIn();
    this.router.navigate(['/select-outlet']);
  }

  loginWithFacebook() {
    console.log('Logging in with Facebook');
    this.guardService.setLoggedIn();
    this.router.navigate(['/select-outlet']);
  }
}
