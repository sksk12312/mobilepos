import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CustomerService {
  private _selectedTable = new BehaviorSubject<string | null>(null);
  private _waiterName = new BehaviorSubject<string | null>(null);

  selectedTable$ = this._selectedTable.asObservable();
  waiterName$ = this._waiterName.asObservable();

  selectTable(table: string) {
    this._selectedTable.next(table);
  }

  setWaiter(name: string) {
    this._waiterName.next(name);
  }
}
