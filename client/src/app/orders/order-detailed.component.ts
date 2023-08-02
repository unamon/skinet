import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { BreadcrumbService } from 'xng-breadcrumb';

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
    private bcService: BreadcrumbService
    ) {}

  ngOnInit(): void {
    this.loadOrderById()
    console.log(this.order)
  }

  loadOrderById() { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.ordersService.getOrderById(+id).subscribe({
      next: res => {
        this.order = res,
        this.bcService.set('@OrderDetailed', `Order# ${this.order.id} - ${this.order.status}`);
      },
      error: error => console.log(error)
    })
  } 
}
