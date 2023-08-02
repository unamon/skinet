import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailedComponent } from './order-detailed.component';
import { OrderRoutingModule } from './order-routing.module';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';



@NgModule({
  declarations: [
    OrderDetailedComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
