import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { RoutingGuardService } from '../routing-guard.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-select-outlet',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './select-outlet.component.html',
  styleUrls: ['./select-outlet.component.scss']
})
export class SelectOutletComponent {

  search = '';
  viewMode: 'list' | 'map' = 'list';

  outlets = [
    {
      id: 'outlet-1',
      name: 'Downtown Central',
      distance: 1.2,
      address: '123 Main Street',
      status: 'Open',
      timeNote: 'Closes 10 PM',
      fav: false
    },
    {
      id: 'outlet-2',
      name: 'Northside Plaza',
      distance: 3.5,
      address: '456 Oak Avenue',
      status: 'Closing Soon',
      timeNote: 'Closes 9 PM',
      fav: true
    },
    {
      id: 'outlet-3',
      name: 'West End Express',
      distance: 5.1,
      address: '789 Pine Lane',
      status: 'Closed',
      timeNote: 'Opens 11 AM',
      fav: false
    }
  ];

  filteredOutlets = [...this.outlets];

  constructor(private router: Router, private guardService: RoutingGuardService, private sessionService: SessionService) {}

  goBack() {
    this.guardService.resetRoutingState();
    this.router.navigate(['/login']);
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
    // Store selected outlet in SessionService
    this.sessionService.setSelectedOutlet(outlet.name);
    
    // Set selected outlet in routing guard
    const success = this.guardService.setSelectedOutlet(outlet);
    
    if (success) {
      // Navigate to dining area selection (next step in correct order)
      this.router.navigate(['/dining-experience']);
    }
  }

  statusColor(status: string) {
    switch (status) {
      case 'Open': return 'text-green-600';
      case 'Closing Soon': return 'text-yellow-600';
      case 'Closed': return 'text-teal-600';
      default: return '';
    }
  }
}
