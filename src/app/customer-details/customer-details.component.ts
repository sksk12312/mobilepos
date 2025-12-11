import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  guestCount = 4;
  selectedCustomer = 'jane';
  isLoading = false;
  error = '';

  constructor(private router: Router) {}

  increaseGuests() {
    if (this.guestCount < 20) {
      this.guestCount++;
    }
  }

  decreaseGuests() {
    if (this.guestCount > 1) {
      this.guestCount--;
    }
  }

  goBack() {
    this.router.navigate(['/dining-experience']);
  }

  onSubmit() {
    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      this.router.navigate(['/select-table']);
    }, 300);
  }
}
