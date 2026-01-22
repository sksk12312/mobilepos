import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { SessionService } from '../services/session.service';
import { RoutingGuardService } from '../routing-guard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface MenuItem {
  id?: string;
  name: string;
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
  waiterName = '';
  selectedTable: number | null = null;
  quantityMap: Map<string, number> = new Map();
  instructionsMap: Map<string, string[]> = new Map();
  expandedInstructions: Map<string, boolean> = new Map();
  customInstructions: Map<string, string> = new Map();

  instructionOptions = ['Very Spicy', 'Medium Spicy', 'Less Spicy', 'No Spice', 'Other'];

  menu: MenuItem[] = [
    {
      id: 'item-1',
      name: 'Bruschetta',
      price: 8.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXZvhWTtUjNrAsNw0VosXxnz3sP0AdZGFDodnpCWtVdJoRSGSo-sqelbcjooI7SUo0DqVwxMkxOJ2If0buvMLxXY_PXB2VKMDD3QilIlu5uRoN8PkmnbQYyI-dPjIMwI_T3vDNJs7D9qGlzkZDknFYnVp8Xap4e2amWIze9sk7qGi9LmrNxsyq7FuPk46jbLEolgQtW0AjxNpqXgFoXpUtDJHZC_7B3PjlfhZ7cXjOcgPEPQKIG5F83UQEpDM-vpn3ds2jxuuHfA'
    },
    {
      id: 'item-2',
      name: 'Garlic Bread',
      price: 6.50,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    },
    {
      id: 'item-3', 
      name: 'Caprese Salad',
      price: 10.00,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa5CAQ_Lqgu3tnqna59FM_z_KbvEYoDDxyuqIVfagMirKsTrHUzLMT1KVAbILHOG-N3zxRtxsDwyK4sVp3aPW6BAbnPf_BZnXfW4MJJQAttDdEJR2LbcdCJsGR_HMpZteDOd-GK2Hn_uXoug208s31s06mgd8Y07pdK13aUnIPz-2ZMaOsmyzONw9XrlK9yXJNZA9AADksde1G0GzVRsPmgAKHPoQd9UsGKKs7k16K6o1Jk93zRkjRTODLJNmfj4a1KZBUJCasQQ'
    },
    {
      id: 'item-4',
      name: 'Fried Calamari',
      price: 12.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTEN82SOEHdYJHCDOLqXguTl6eLN1EeGfjPXZyxhk2wGhvumvi9R8k4vo_soYOUNjxEkg2uFwObHTA-UTctO6H5jH-uhpef7UO2kJTtn9K6tetCvi2esFIN0ps63JwYzMKBv_3Kxtb3fsEY_JNXHrN0RwxSq1k10hSZXkUMcgk4q-Car_mjabyZ3HtSp0W82vzeinsVcDu45Ep8cWWa2uVhhc2mkg1_lBl0zc5i-ZDLeAUVkOVooOek_2cT1JVQrAZEqVMFW3NA'
    },
    {
      id: 'pizza-1',
      name: 'Margherita Pizza',
      price: 14.00,
      category: 'Mains',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    },
    {
      id: 'pizza-2',
      name: 'Pepperoni Pizza',
      price: 15.99,
      category: 'Mains',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    },
    {
      id: 'pizza-3',
      name: 'Veggie Pizza',
      price: 13.50,
      category: 'Mains',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    }
  ];

  filteredMenu: MenuItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, public cartService: CartService, private guardService: RoutingGuardService, private sessionService: SessionService) {
    this.filteredMenu = this.menu.filter(item => item.category === this.selectedCategory);
  }

  ngOnInit() {
    // Load session data
    this.waiterName = this.sessionService.getWaiterName();
    this.selectedTable = this.sessionService.getSelectedTable();

    // Subscribe to cart items updates
    this.cartService.itemsObservable.pipe(takeUntil(this.destroy$)).subscribe((items: CartItem[]) => {
      this.cartCount = items.reduce((sum, item) => sum + item.qty, 0);
      // Initialize quantity map from cart
      items.forEach(item => { 
        this.quantityMap.set(item.id, item.qty);
      });
    });

    // Load cart items to populate quantity map
    const cartItems = this.cartService.getItems();
    cartItems.forEach(item => {
      this.quantityMap.set(item.id, item.qty);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.router.navigate(['/select-table']);
  }

  goToTableSelect() {
    this.router.navigate(['/select-table']);
  }

  getQuantity(itemId: string): number {
    return this.quantityMap.get(itemId) || 0;
  }

  increaseQuantity(item: MenuItem) {
    if (item.id?.startsWith('pizza-')) {
      // For customizable items, navigate to customize page
      this.router.navigate(['/customize-item'], {
        state: { item: item }
      });
    } else {
      const currentQty = this.getQuantity(item.id || '');
      const newQty = currentQty + 1;
      this.quantityMap.set(item.id || '', newQty);
      
      const instructions = this.instructionsMap.get(item.id || '') || [];
      const cartItem: Omit<CartItem, 'qty'> = {
        id: item.id || `item-${Math.random()}`,
        name: item.name,
        price: item.price,
        image: item.image,
        instructions: instructions.length > 0 ? instructions : undefined
      };
      this.cartService.addItem(cartItem, 1);
    }
  }

  decreaseQuantity(item: MenuItem) {
    const currentQty = this.getQuantity(item.id || '');
    if (currentQty > 0) {
      const newQty = currentQty - 1;
      this.quantityMap.set(item.id || '', newQty);
      this.cartService.updateQuantity(item.id || '', newQty);
    }
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
    // Check if item is customizable (pizza)
    if (item.id?.startsWith('pizza-')) {
      // Navigate to customize page with item data
      this.router.navigate(['/customize-item'], {
        state: {
          item: item
        }
      });
    } else {
      // Direct add for non-customizable items
      const instructions = this.instructionsMap.get(item.id || '') || [];
      const cartItem: Omit<CartItem, 'qty'> = {
        id: item.id || `item-${Math.random()}`,
        name: item.name,
        price: item.price,
        image: item.image,
        instructions: instructions.length > 0 ? instructions : undefined
      };
      this.cartService.addItem(cartItem);
    }
  }

  openCart() {
    this.router.navigate(['/cart']);
  }

  toggleInstructionsDropdown(itemId: string): void {
    const expanded = this.expandedInstructions.get(itemId) || false;
    this.expandedInstructions.set(itemId, !expanded);
  }

  toggleInstruction(itemId: string, instruction: string): void {
    const current = this.instructionsMap.get(itemId) || [];
    const index = current.indexOf(instruction);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(instruction);
    }
    this.instructionsMap.set(itemId, [...current]);
  }

  isInstructionSelected(itemId: string, instruction: string): boolean {
    const instructions = this.instructionsMap.get(itemId) || [];
    return instructions.includes(instruction);
  }

  updateCustomInstruction(itemId: string, value: string): void {
    const current = this.instructionsMap.get(itemId) || [];
    const oldCustomValue = this.customInstructions.get(itemId) || '';
    
    // Remove old custom instruction if it exists
    if (oldCustomValue) {
      const index = current.indexOf(oldCustomValue);
      if (index > -1) {
        current.splice(index, 1);
      }
    }
    
    // Add new custom instruction if not empty
    if (value.trim()) {
      current.push(value.trim());
    }
    
    this.customInstructions.set(itemId, value);
    this.instructionsMap.set(itemId, [...current]);
  }

  getInstructionsText(itemId: string): string {
    const instructions = this.instructionsMap.get(itemId) || [];
    return instructions.length > 0 ? instructions.join(', ') : 'Add Instructions';
  }
}


