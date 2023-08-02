import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit{
  order?:Order;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadOrderById() { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.ordersService.getOrderById(+id).subscribe({
      next: res => this.order = res,
      error: error => console.log(error)
    })
  } 
}
