import { Component } from '@angular/core';
import { NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-table',
  standalone: true,
  imports: [NgFor, NgClass, CurrencyPipe],
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.scss']
})
export class SelectTableComponent {

  diningArea = 'Fine Dine';

  tables = [
    { id: 1, number: 1, total: 0, items: 0, status: 'available' },
    { id: 2, number: 2, total: 45.5, items: 3, status: 'occupied' },
    { id: 3, number: 3, total: 102, items: 8, status: 'selected' },
    { id: 4, number: 4, total: 12.75, items: 1, status: 'occupied' },
    { id: 5, number: 5, total: 0, items: 0, status: 'available' },
    { id: 6, number: 6, total: 0, items: 0, status: 'reserved' },
    { id: 7, number: 7, total: 88.1, items: 5, status: 'occupied' },
    { id: 8, number: 8, total: 210.5, items: 12, status: 'occupied' },
    { id: 9, number: 9, total: 0, items: 0, status: 'available' }
  ];

  selectedTable = this.tables.find(t => t.status === 'selected') || null;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setup-table']);
  }

  selectTable(table: any) {
    this.selectedTable = table;
  }

  viewOrder() {
    if (!this.selectedTable) return;

    console.log('Viewing order for Table:', this.selectedTable);

    this.router.navigate(['/pos'], {
      queryParams: { table: this.selectedTable.number }
    });
  }
}
