import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup-table.component.html',
  styleUrls: ['./setup-table.component.scss']
})
export class SetupTableComponent {

  guests = 4;

  customers = [
    {
      id: 1,
      name: 'Jane Doe',
      description: 'Loyalty ID: JD12345',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNeNkxUaee_PHGr6_RAL-wzQ_yjrjQ4CMOVHvQHue_08VrxA12icyhyPQ7RkSXqvh0L2z2LMvdh0NSbUNplkIJ8KV-eGTx6BhT-6R4obtPpGs9pWy4_p_9HALQcVicbym71jYg8GH8PSekFv87BVLpqFmxsSYSv-nw6bpAUECcWkehHbLSxcKRRiZVXHbvRJhz4XlKMhaYC8IotaiRP4aWVYoD-iyk_LobnflXBHndwGnwsh3XZ03OuGhi7vvKj5xKAKi4j992rA'
    },
    {
      id: 2,
      name: 'John Smith',
      description: 'Loyalty ID: JS67890',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgbnFmpiJqUIUwj9hTefmwBYrCnVmz09V8PnhIlj94Y37xeil5JQahSHlOq4EmX_cvrbkAVRUc6mwIEcS39fK71Nf23fy4Onwc8XknMCHdQOfoze_BUp9VW-Q5DDZNCdvBrK-wUaEuCoc2bwVdEnTg2_CFc262uFNzIz7AzBBRu53spF0oMVsMlaqD0gQnyTc7C9EzFksSLKw0_7ehBbw0WdUAiq8hzmovrJhBPQ2kdzEUI5XLgy797KJVcCaQxjM5Yuy7IObH4w'
    },
    {
      id: 3,
      name: 'Guest',
      description: 'Continue without a profile',
      image: ''
    }
  ];

  selectedCustomer = this.customers[0];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dining-experience']);
  }

  increaseGuests() {
    this.guests++;
  }

  decreaseGuests() {
    if (this.guests > 1) this.guests--;
  }

  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
  }

  addNewProfile() {
    alert('Feature coming soon.');
  }

  startOrdering() {
    console.log('Guests:', this.guests);
    console.log('Selected Customer:', this.selectedCustomer);

    this.router.navigate(['/pos']);
  }
}
