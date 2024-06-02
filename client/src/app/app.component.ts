import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'Angular';

  constructor(private basketServive: BasketService){

  }
  ngOnInit(): void {
   const basketId = localStorage.getItem('basket_id');
   if(basketId) this.basketServive.getBasket(basketId)
  }
}
