/*import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { response } from 'express';
import { error, log } from 'console';


import { Brand } from '../shared/models/Brand';
import { Type } from '../shared/models/Type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  @viewChild ('search') searchTeam?: ElementRef;
products: Product[] = [];
types: Type[] = [];
brands: Brand[] = [];
shopParams = new ShopParams();
sortOption =[ 
  {name : 'Alphabetical', value: 'name'},
  {name : 'price : low to high', value : 'priceAsc'},
  {name : 'price : high to low', value : 'priceDesc'}
];
totalCount = 0;


constructor(private shopService : ShopService){

}

  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data,
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id :0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types =  [{id :0, name: 'All'}, ...response],
      error: error => console.log(error)
    })
  }

  OnbrandIdSelected(brandId : number){
    this.shopParams.brandId = brandId;
    this.getProducts();
  } 
  OntypeIdSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  OnSortSelected(event : any){
      this.shopParams.sort = event.target.value;
      this.getProducts();
  }

  OnPageChanged(event : any){
      if(this.shopParams.pageNumber !== event){
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
  }

  onSearch(){
    this.shopParams.search = this.searchTeam?.nativeElement.value;
    this.getProducts();
  }

  onReset(){
    if(this.searchTeam) this.searchTeam.nativeElement.value = '';
    this.shopParams = new shopParams();
    this.getProducts();
  }
}*/

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/Brand';
import { Type } from '../shared/models/Type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm?: ElementRef;
  products: Product[] = [];
  types: Type[] = [];
  brands: Brand[] = [];
  shopParams = new ShopParams();
  sortOption = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    });
  }

  OnbrandIdSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  OntypeIdSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  OnSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  OnPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}

