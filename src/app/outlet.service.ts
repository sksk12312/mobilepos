import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  getOutlets() {
    return [
      { id: 'o1', name: 'Outlet 1' },
      { id: 'o2', name: 'Outlet 2' }
    ];
  }
}
