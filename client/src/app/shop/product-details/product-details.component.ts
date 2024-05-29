import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { error } from 'console';
import { Product } from '../../shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  constructor(
    private shopService : ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService:BreadcrumbService,
    
    ){
   this.bcService.set('@productDetails', ' ')
    }


product?: Product
  ngOnInit(): void {
  this.loadProduct();
    
  }
  ///load product

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product,
        this.bcService.set('@productDetails', product.name)
      },
      error: error => console.log(error)
    })
  }


  
}
