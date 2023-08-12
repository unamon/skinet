import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../models/brand';
import { Product } from '../models/products';
import { ShopParams } from '../models/shopParams';
import { Type } from '../models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;

  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  
  shopParams: ShopParams;
  
  sortOptions = [
    ,{name:'Alphabetical', value:'name'}
    ,{name:'Price: Low to high', value:'priceAsc'}
    ,{name:'Price: High to low', value:'priceDesc'}
  ];
  totalCount = 0;


  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() { 
    this.shopService.getProducts().subscribe({
      next:  response => {
        this.products              = response.data;
        this.totalCount            = response.count;
        console.log(response)
      },
      error: error => console.log(error)
    })
  }
  getBrands() { 
    this.shopService.getBrands().subscribe({
      next:  response => this.brands = [{ id:0, name:'All'}, ...response],
      error: error => console.log(error)
    })
  }
  getTypes() { 
    this.shopService.getTypes().subscribe({
      next:  response => this.types = [{ id:0, name:'All'}, ...response],
      error: error => console.log(error)
    })
  }

  onBrandSelected(brandId: number) { 
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId: number){ 
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(event:any) { 
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event:any) { 
    const params = this.shopService.getShopParams();
    if(params.pageNumber != event.page){
      params.pageNumber = event.page;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch()
  {
    const params = this.shopService.getShopParams();

    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    
    this.getProducts();
  }
}
