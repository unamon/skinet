import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from '../models/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  orders?:Order[];

  constructor(
    private ordersService: OrdersService,
    ) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: res => this.orders = res,
      error: error => console.log(error)
    })
  }



  
}
