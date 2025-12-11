import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingGuardService } from '../routing-guard.service';
import { SessionService } from '../services/session.service';

interface Table {
  id: number;
  number: number;
  total: number;
  items: number;
  status: 'available' | 'occupied' | 'selected' | 'reserved';
}

@Component({
  selector: 'app-select-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.scss']
})
export class SelectTableComponent {
  diningArea = 'Fine Dine';
  showWaiterPrompt = false;
  waiterName = '';
  selectedTable: Table | null = null;

  tables: Table[] = [
    { id: 1, number: 1, total: 0, items: 0, status: 'available' },
    { id: 2, number: 2, total: 45.5, items: 3, status: 'occupied' },
    { id: 3, number: 3, total: 102, items: 8, status: 'available' },
    { id: 4, number: 4, total: 12.75, items: 1, status: 'occupied' },
    { id: 5, number: 5, total: 0, items: 0, status: 'available' },
    { id: 6, number: 6, total: 0, items: 0, status: 'reserved' },
    { id: 7, number: 7, total: 88.1, items: 5, status: 'occupied' },
    { id: 8, number: 8, total: 210.5, items: 12, status: 'occupied' },
    { id: 9, number: 9, total: 0, items: 0, status: 'available' }
  ];

  constructor(private router: Router, private guardService: RoutingGuardService, private sessionService: SessionService) {}

  goBack() {
    this.router.navigate(['/customer-details']);
  }

  selectTable(table: Table) {
    if (table.status === 'available') {
      this.selectedTable = table;
      this.showWaiterPrompt = true;
      this.waiterName = '';
    }
  }

  cancelWaiterPrompt() {
    this.showWaiterPrompt = false;
    this.selectedTable = null;
    this.waiterName = '';
  }

  confirmWaiter() {
    if (!this.waiterName.trim() || !this.selectedTable) {
      return;
    }

    const success = this.guardService.setSelectedTable(this.selectedTable);
    
    if (success) {
      // Store waiter name and table in session service
      this.sessionService.setWaiterName(this.waiterName);
      this.sessionService.setSelectedTable(this.selectedTable.number);
      this.router.navigate(['/menu']);
    }
  }
}

