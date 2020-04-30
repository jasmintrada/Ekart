import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:Array<Order> = [];
  errorMessage:string = "";

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.viewOrders().subscribe(success=>{
      this.orders = success;
      this.errorMessage = "";
    },error=>{
      this.orders = [];
      this.errorMessage = "Something went wrong. Please try again later.";
    });
  }

}
