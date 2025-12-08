import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-select-outlet',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './select-outlet.component.html',
  styleUrls: ['./select-outlet.component.scss']
})
export class SelectOutletComponent {

  search = '';
  viewMode: 'list' | 'map' = 'list';

  outlets = [
    {
      name: 'Downtown Central',
      distance: 1.2,
      address: '123 Main Street',
      status: 'Open',
      timeNote: 'Closes 10 PM',
      fav: false
    },
    {
      name: 'Northside Plaza',
      distance: 3.5,
      address: '456 Oak Avenue',
      status: 'Closing Soon',
      timeNote: 'Closes 9 PM',
      fav: true
    },
    {
      name: 'West End Express',
      distance: 5.1,
      address: '789 Pine Lane',
      status: 'Closed',
      timeNote: 'Opens 11 AM',
      fav: false
    }
  ];

  filteredOutlets = [...this.outlets];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dining-experience']);
  }

  filterOutlets() {
    const term = this.search.toLowerCase();
    this.filteredOutlets = this.outlets.filter(o =>
      o.name.toLowerCase().includes(term) ||
      o.address.toLowerCase().includes(term)
    );
  }

  toggleFavourite(outlet: any) {
    outlet.fav = !outlet.fav;
  }

  selectOutlet(outlet: any) {
    console.log('Selected outlet:', outlet.name);
    // Navigate to menu after selecting outlet
    this.router.navigate(['/menu']);
  }

  statusColor(status: string) {
    switch (status) {
      case 'Open': return 'text-green-600';
      case 'Closing Soon': return 'text-yellow-600';
      case 'Closed': return 'text-red-600';
      default: return '';
    }
  }
}
