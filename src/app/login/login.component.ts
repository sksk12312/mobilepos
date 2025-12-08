import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// No structural ng directives required in this login component template

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

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
  console.log('Logging in with:', this.email, this.password);

    // Navigate to POS screen
    this.router.navigate(['/pos']);
  }
}
