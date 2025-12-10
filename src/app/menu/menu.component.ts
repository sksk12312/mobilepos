import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../cart.service';
import { RoutingGuardService } from '../routing-guard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  searchQuery = '';
  categories = ['Starters', 'Mains', 'Pasta', 'Salads', 'Drinks', 'Desserts'];
  selectedCategory = 'Starters';
  cartCount = 0;
  showRestaurantWarning = false;
  pendingItem: { item: MenuItem; restaurant: any } | null = null;

  menu: MenuItem[] = [
    {
      id: 'item-1',
      name: 'Bruschetta',
      description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.',
      price: 8.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXZvhWTtUjNrAsNw0VosXxnz3sP0AdZGFDodnpCWtVdJoRSGSo-sqelbcjooI7SUo0DqVwxMkxOJ2If0buvMLxXY_PXB2VKMDD3QilIlu5uRoN8PkmnbQYyI-dPjIMwI_T3vDNJs7D9qGlzkZDknFYnVp8Xap4e2amWIze9sk7qGi9LmrNxsyq7FuPk46jbLEolgQtW0AjxNpqXgFoXpUtDJHZC_7B3PjlfhZ7cXjOcgPEPQKIG5F83UQEpDM-vpn3ds2jxuuHfA'
    },
    {
      id: 'item-2',
      name: 'Garlic Bread',
      description: 'Warm, buttery garlic bread, perfect for sharing.',
      price: 6.50,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    },
    {
      id: 'item-3',
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, ripe tomatoes, basil, balsamic glaze.',
      price: 10.00,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa5CAQ_Lqgu3tnqna59FM_z_KbvEYoDDxyuqIVfagMirKsTrHUzLMT1KVAbILHOG-N3zxRtxsDwyK4sVp3aPW6BAbnPf_BZnXfW4MJJQAttDdEJR2LbcdCJsGR_HMpZteDOd-GK2Hn_uXoug208s31s06mgd8Y07pdK13aUnIPz-2ZMaOsmyzONw9XrlK9yXJNZA9AADksde1G0GzVRsPmgAKHPoQd9UsGKKs7k16K6o1Jk93zRkjRTODLJNmfj4a1KZBUJCasQQ'
    },
    {
      id: 'item-4',
      name: 'Fried Calamari',
      description: 'Lightly battered and fried calamari served with marinara sauce.',
      price: 12.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTEN82SOEHdYJHCDOLqXguTl6eLN1EeGfjPXZyxhk2wGhvumvi9R8k4vo_soYOUNjxEkg2uFwObHTA-UTctO6H5jH-uhpef7UO2kJTtn9K6tetCvi2esFIN0ps63JwYzMKBv_3Kxtb3fsEY_JNXHrN0RwxSq1k10hSZXkUMcgk4q-Car_mjabyZ3HtSp0W82vzeinsVcDu45Ep8cWWa2uVhhc2mkg1_lBl0zc5i-ZDLeAUVkOVooOek_2cT1JVQrAZEqVMFW3NA'
    }
  ];

  filteredMenu: MenuItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, public cartService: CartService, private guardService: RoutingGuardService) {
    this.filteredMenu = this.menu.filter(item => item.category === this.selectedCategory);
  }

  ngOnInit() {
    // Subscribe to cart count updates in real-time
    this.cartService.cartCount$.pipe(takeUntil(this.destroy$)).subscribe((count: number) => {
      this.cartCount = count;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.router.navigate(['/select-table']);
  }

  filterMenu() {
    const term = this.searchQuery.trim().toLowerCase();
    this.filteredMenu = this.menu.filter(item =>
      item.category === this.selectedCategory &&
      item.name.toLowerCase().includes(term)
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.searchQuery = '';
    this.filterMenu();
  }

  addToCart(item: MenuItem) {
    // Get current restaurant from CartService
    const currentRestaurant = this.cartService.currentRestaurant.value;
    
    // Create a CartItem from MenuItem
    const cartItem: CartItem = {
      id: item.id || `item-${Math.random()}`,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: 1
    };

    // Mock restaurant data (in production, this would come from the outlet selection)
    const mockRestaurant = {
      id: currentRestaurant?.id || 'default-restaurant',
      name: currentRestaurant?.name || 'Fork & Spoon',
      address: currentRestaurant?.address || '123 Main St',
      distance: currentRestaurant?.distance || 2.5,
      status: currentRestaurant?.status || 'Open',
      image: currentRestaurant?.image || ''
    };

    // Try to add to cart
    const canAdd = this.cartService.addToCart(cartItem, mockRestaurant);

    if (canAdd) {
      // Item added successfully
      console.log('Item added to cart:', item.name);
    } else {
      // Different restaurant - show warning dialog
      this.pendingItem = { item, restaurant: mockRestaurant };
      this.showRestaurantWarning = true;
    }
  }

  confirmSwitchRestaurant() {
    if (this.pendingItem) {
      const cartItem: CartItem = {
        id: this.pendingItem.item.id || `item-${Math.random()}`,
        name: this.pendingItem.item.name,
        price: this.pendingItem.item.price,
        description: this.pendingItem.item.description,
        image: this.pendingItem.item.image,
        quantity: 1
      };
      this.cartService.switchRestaurantAndAddItem(cartItem, this.pendingItem.restaurant);
      this.showRestaurantWarning = false;
      this.pendingItem = null;
    }
  }

  cancelSwitchRestaurant() {
    this.showRestaurantWarning = false;
    this.pendingItem = null;
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
