import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SessionService } from '../services/session.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  pendingOrders: number;
  averageOrderValue: number;
}

interface DailyMetric {
  date: string;
  orders: number;
  revenue: number;
}

interface PopularItem {
  name: string;
  quantity: number;
  revenue: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: OrderStats = {
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
    averageOrderValue: 0
  };

  dailyMetrics: DailyMetric[] = [];
  popularItems: PopularItem[] = [];
  recentOrders: any[] = [];
  selectedFilter = 'today';
  waiterName = '';
  outletName = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSessionData();
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSessionData(): void {
    const waiterName = this.sessionService.getWaiterName();
    const outletName = this.sessionService.getSelectedOutlet();
    this.waiterName = waiterName || 'Guest';
    this.outletName = outletName || 'Main Outlet';
  }

  loadDashboardData(): void {
    // Simulate loading data - in production, this would fetch from API
    this.loadOrderStats();
    this.loadDailyMetrics();
    this.loadPopularItems();
    this.loadRecentOrders();
  }

  loadOrderStats(): void {
    // Mock data - replace with actual API call
    this.stats = {
      totalOrders: 45,
      totalRevenue: 12500,
      completedOrders: 38,
      pendingOrders: 7,
      averageOrderValue: 277.78
    };
  }

  loadDailyMetrics(): void {
    // Mock data - replace with actual API call
    this.dailyMetrics = [
      { date: 'Mon', orders: 12, revenue: 2400 },
      { date: 'Tue', orders: 19, revenue: 4210 },
      { date: 'Wed', orders: 15, revenue: 3290 },
      { date: 'Thu', orders: 22, revenue: 4800 },
      { date: 'Fri', orders: 28, revenue: 6200 },
      { date: 'Sat', orders: 38, revenue: 7400 },
      { date: 'Today', orders: 9, revenue: 2100 }
    ];
  }

  loadPopularItems(): void {
    // Mock data - replace with actual API call
    this.popularItems = [
      { name: 'Margherita Pizza', quantity: 45, revenue: 3375 },
      { name: 'Pepperoni Pizza', quantity: 38, revenue: 3040 },
      { name: 'Pasta Carbonara', quantity: 32, revenue: 2560 },
      { name: 'Caesar Salad', quantity: 28, revenue: 1680 },
      { name: 'Garlic Bread', quantity: 52, revenue: 910 }
    ];
  }

  loadRecentOrders(): void {
    // Mock data - replace with actual API call
    this.recentOrders = [
      { id: '#001', table: 5, amount: 450, status: 'Completed', time: '12:30 PM' },
      { id: '#002', table: 8, amount: 320, status: 'Completed', time: '1:15 PM' },
      { id: '#003', table: 3, amount: 250, status: 'In Progress', time: '2:45 PM' },
      { id: '#004', table: 12, amount: 580, status: 'Pending', time: '3:10 PM' },
      { id: '#005', table: 7, amount: 410, status: 'Completed', time: '3:45 PM' }
    ];
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.loadDashboardData();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getSuccessRate(): number {
    if (this.stats.totalOrders === 0) return 0;
    return Math.round((this.stats.completedOrders / this.stats.totalOrders) * 100);
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}
