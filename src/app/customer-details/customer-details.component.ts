import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: string;
  name: string;
  loyaltyId: string;
}

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
  showAddCustomerModal = false;
  newCustomerName = '';
  newCustomerLoyaltyId = '';

  customers: Customer[] = [
    { id: 'jane', name: 'Jane Doe', loyaltyId: 'JD12345' },
    { id: 'john', name: 'John Smith', loyaltyId: 'JS67890' }
  ];

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

  openAddCustomerModal() {
    this.showAddCustomerModal = true;
    this.newCustomerName = '';
    this.newCustomerLoyaltyId = '';
  }

  closeAddCustomerModal() {
    this.showAddCustomerModal = false;
    this.newCustomerName = '';
    this.newCustomerLoyaltyId = '';
  }

  addNewCustomer() {
    if (!this.newCustomerName.trim()) {
      this.error = 'Please enter a customer name';
      return;
    }

    const newId = 'customer_' + Date.now();
    const newCustomer: Customer = {
      id: newId,
      name: this.newCustomerName.trim(),
      loyaltyId: this.newCustomerLoyaltyId.trim() || 'N/A'
    };

    this.customers.push(newCustomer);
    this.selectedCustomer = newId;
    this.closeAddCustomerModal();
  }

  onSubmit() {
    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      this.router.navigate(['/select-table']);
    }, 300);
  }
}
