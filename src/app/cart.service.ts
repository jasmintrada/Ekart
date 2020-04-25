import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from './Cart';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { RestURL } from './RestAPIURL';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  viewCartUrl:string = RestURL.url +"cart/getDetails/";

  addCartUrl:string = RestURL.url +"cart/addToCart";

  remoevCartUrl:string = RestURL.url +"cart/remove/";

  updateCartUrl:string = RestURL.url +"cart/updateCart";


  constructor(private http:HttpClient,private router:Router) { }


  

  viewCart():Observable<any>{
    let userId = sessionStorage.getItem("userId");
    if(userId){
      return  this.http.get<any>(this.viewCartUrl+userId);
    }else{
      return new Observable(observer => {
         observer.next({"message":sessionStorage.getItem("cart")?JSON.parse(sessionStorage.getItem("cart")):[]}),
           observer.complete()
      }); 
    }
  }

  addToCart(data:Cart):Observable<any>{
    let userId = sessionStorage.getItem("userId");
    data.totalProductPrice = data.product.offerPrice*data.quantity;
    
    if(userId){
      let response = this.viewCart();
      response.subscribe(success=>{
        data.cartPrice = success.message.length>0?success.message[0].cartPrice:0;
        data.userId = +userId;
        data.cartPrice += data.totalProductPrice;
        let cart:Array<Cart> = success.message;
        for(let i=0;i<cart.length;i++){
          if(cart[i].product.id == data.product.id){
            data.id=cart[i].id;
            break;
          }
        }
        this.http.post<any>(this.addCartUrl,data).subscribe();
      },error=>{
        data.cartPrice = data.totalProductPrice;
        data.userId = +userId;
       // AppComponent.cartItems = "1";
      this.http.post<any>(this.addCartUrl,data).subscribe();
      });
    }
    else{
      this.viewCart().subscribe(success=>{
        data.cartPrice = success.message.length>0?success.message[0].cartPrice:0;
      });
      data.cartPrice = data.cartPrice + data.totalProductPrice;
    
      let cart:Array<Cart> = sessionStorage.getItem("cart")?JSON.parse(sessionStorage.getItem("cart")):[];
      let flag:boolean = false;
      for(let i=0;i<cart.length;i++){
        if(data.product.id==cart[i].product.id){
          cart[i].quantity+=data.quantity;
          cart[i].totalProductPrice = cart[i].quantity*cart[i].product.offerPrice;
          flag = true;
        }
        cart[i].cartPrice+=data.quantity*data.product.offerPrice;
      }
      if(!flag){
        cart.push(data);
      }
      //AppComponent.cartItems = cart.length+"";
      sessionStorage.setItem("cart",JSON.stringify(cart));
      
    }
    return null;
  }
  updateCart(data:Cart):Observable<any>{
    let userId = sessionStorage.getItem("userId");
    let oldQuantity:number = data.totalProductPrice/data.product.offerPrice;
    let newQuantity:number = data.quantity;
    data.totalProductPrice = data.quantity*data.product.offerPrice;
      data.cartPrice = data.cartPrice + data.product.offerPrice*(newQuantity-oldQuantity);
    
      console.log(data.cartPrice);
      if(userId){
        data.userId = +userId;
       this.http.post<any>(this.updateCartUrl,data).subscribe();
      }
      else{
        let cart:Array<Cart> = sessionStorage.getItem("cart")?JSON.parse(sessionStorage.getItem("cart")):[];
         for(let i=0;i<cart.length;i++){
          if(data.product.id==cart[i].product.id){
            cart[i] = data;
          }
          cart[i].cartPrice=data.cartPrice;
        }
        sessionStorage.setItem("cart",JSON.stringify(cart));
      };
    
    return null;
  }

  removeCart(id:number):Observable<any>{
    let userId = sessionStorage.getItem("userId");
    if(userId){
      let data:any;
      return this.http.get(this.remoevCartUrl+userId+"/"+id);
    }else{
      let cart:Array<Cart> = sessionStorage.getItem("cart")?JSON.parse(sessionStorage.getItem("cart")):[];
      let price :number=0;
      for(let i=0;i<cart.length;i++){
        if(cart[i].product.id==id){
          price = cart[i].cartPrice-cart[i].totalProductPrice;
          cart.splice(i, 1);
          break;
        }
      }
      for(let i=0;i<cart.length;i++){
          cart[i].cartPrice = price;
      }
      sessionStorage.setItem("cart",JSON.stringify(cart));
      return new Observable(observer => {
        observer.next({"message":sessionStorage.getItem("cart")?JSON.parse(sessionStorage.getItem("cart")):[]}),
          observer.complete()
     }); 
    }
    
  }
}
