import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/models/basket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // Corrected from styleUrl to styleUrls
})
export class NavbarComponent {
  isMobileMenuVisible = false;

  constructor(public basketService: BasketService) {}

  toggleMobileMenu() {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }

  getCount(items: BasketItem []){
    return items.reduce((sum,item) => sum + item.quantity, 0);
  }
}
