import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../Order';
import { Router } from '@angular/router';
import { Address } from '../Address';
import { OrderDetails } from '../OrderDetails';
import { Product } from '../Product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:Array<Order> = [];
  errorMessage:string = "";
  imageWidth = 80;
  imageHeight = 120;
  imageMargin = 12;
  category:string = "All";
  constructor(private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    // this.orderService.viewOrders().subscribe(success=>{
    //   this.orders = success;
    //   this.errorMessage = "";
    // },error=>{
      
    //   this.errorMessage = "Something went wrong. Please try again later.";
    // });
    this.orders = [];
      let order = new Order();
      order.orderedDate = new Date("1-1-11");
      order.total = 11111;
      order.id = 1;
      order.deliveryDate = new Date("2-1-11");
      order.deliveryCharge = 20;
      order.btnReturn = false;
      order.btnReviewProduct = false;
      order.btnReviewSeller = false;
      let orderDetail = new OrderDetails();
      let product = new Product();
      product.category = "Mobiles";
      product.displayName = "Moto G5 S+";
      orderDetail.quantity = 2;
      orderDetail.price = 14000;
      orderDetail.product = product;
      order.orderDetails = [orderDetail];
      this.orders.push(order);
      this.orders.push(order);
      let address = {addressLine1: "A-20, Ila Society, India Colony Road",
      addressLine2: null,
      city: "Ahmedabad",
      country: "India",
      defaultAddress: true,
      id: 2,
      locality: "Bapunagar",
      phoneNo: 7698564894,
      pincode: "382350",
      state: "Gujarat",
      userId: 1,
      userName: "Jasmin Trada"};
      order.shippingAddress = address;
  }
  viewProduct(id:number){
    this.router.navigate(['/viewProduct',id]);
  }
  clickOnCategory(id){
    let elements:HTMLCollectionOf<Element> = document.getElementsByClassName("buttonSelected");
    for(let i=0;i<elements.length;i++){
      elements[i].classList.remove("buttonSelected");
    }
    id.srcElement.classList.add("buttonSelected");
    this.category = id.srcElement.getAttribute("value");
  }
}
