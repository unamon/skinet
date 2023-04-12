import { Component, OnInit } from '@angular/core';
import { Product } from './models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Skinet';
  products: Product[] =[];

  constructor() { 

  }
  ngOnInit(): void {
  
  }
}
