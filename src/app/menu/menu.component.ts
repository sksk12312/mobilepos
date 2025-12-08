import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface MenuItem {
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
export class MenuComponent {
  searchQuery = '';

  categories = ['Starters', 'Mains', 'Pasta', 'Salads', 'Drinks', 'Desserts'];

  selectedCategory = 'Starters';

  cartCount = 3;

  menu: MenuItem[] = [
    {
      name: 'Bruschetta',
      description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.',
      price: 8.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXZvhWTtUjNrAsNw0VosXxnz3sP0AdZGFDodnpCWtVdJoRSGSo-sqelbcjooI7SUo0DqVwxMkxOJ2If0buvMLxXY_PXB2VKMDD3QilIlu5uRoN8PkmnbQYyI-dPjIMwI_T3vDNJs7D9qGlzkZDknFYnVp8Xap4e2amWIze9sk7qGi9LmrNxsyq7FuPk46jbLEolgQtW0AjxNpqXgFoXpUtDJHZC_7B3PjlfhZ7cXjOcgPEPQKIG5F83UQEpDM-vpn3ds2jxuuHfA'
    },
    {
      name: 'Garlic Bread',
      description: 'Warm, buttery garlic bread, perfect for sharing.',
      price: 6.50,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlJZDPYh1wLpYARI5lbhIlv0Qdft9Zm07wNVJp8jizR7rPKMasvAk7On5m7t9e_uuS-McEBmyKl1a15_fw4M1P2XFrRQQRChLckSE1o_N2Kh9gqhEHlrHkgPaZ8xUjfXoAx5M-38c0mpqcjuRUyAmSJEzkaig2UvGpAdhmKz3R4T7y4qC3tsUP3hUuO2YG0vcqcwwIqJHS6fQFqEP6c66DTYtmf7jjS58NrZfAUAQ7z3gk8DHD2fp_7LplMe2YPrIqXdophJCEA'
    },
    {
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, ripe tomatoes, basil, balsamic glaze.',
      price: 10.00,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAa5CAQ_Lqgu3tnqna59FM_z_KbvEYoDDxyuqIVfagMirKsTrHUzLMT1KVAbILHOG-N3zxRtxsDwyK4sVp3aPW6BAbnPf_BZnXfW4MJJQAttDdEJR2LbcdCJsGR_HMpZteDOd-GK2Hn_uXoug208s31s06mgd8Y07pdK13aUnIPz-2ZMaOsmyzONw9XrlK9yXJNZA9AADksde1G0GzVRsPmgAKHPoQd9UsGKKs7k16K6o1Jk93zRkjRTODLJNmfj4a1KZBUJCasQQ'
    },
    {
      name: 'Fried Calamari',
      description: 'Lightly battered and fried calamari served with marinara sauce.',
      price: 12.99,
      category: 'Starters',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZTEN82SOEHdYJHCDOLqXguTl6eLN1EeGfjPXZyxhk2wGhvumvi9R8k4vo_soYOUNjxEkg2uFwObHTA-UTctO6H5jH-uhpef7UO2kJTtn9K6tetCvi2esFIN0ps63JwYzMKBv_3Kxtb3fsEY_JNXHrN0RwxSq1k10hSZXkUMcgk4q-Car_mjabyZ3HtSp0W82vzeinsVcDu45Ep8cWWa2uVhhc2mkg1_lBl0zc5i-ZDLeAUVkOVooOek_2cT1JVQrAZEqVMFW3NA'
    }
  ];

  filteredMenu: MenuItem[] = [];

  constructor(private router: Router) {
    // initialize filtered menu to selectedCategory
    this.filteredMenu = this.menu.filter(item => item.category === this.selectedCategory);
  }

  goBack() {
    this.router.navigate(['/select-outlet']);
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
    this.cartCount++;
    console.log('Added to cart:', item.name);
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
