import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RestURL} from './RestAPIURL';
import { Observable } from 'rxjs';
import { Order } from './Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  viewOrdersUrl:string = RestURL.url+ "order/viewOrders/";

  constructor(private http:HttpClient) { }

  viewOrders():Observable<Array<Order>>{
    let userId = sessionStorage.getItem("userId");
    return this.http.get<Array<Order>>(this.viewOrdersUrl+userId);
  }

}
