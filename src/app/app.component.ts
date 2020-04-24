import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineShopping';
  static loggedIn:boolean;
  static userName:string;
  static cartItems:string;
  constructor(private router:Router,private cartService:CartService){
    this.updateCartCount();
    if(sessionStorage.getItem("userName")){
      AppComponent.loggedIn = true;
      AppComponent.userName = sessionStorage.getItem("userName");
    }
    else AppComponent.loggedIn = false;
  }
  get loggedIn(){
    return AppComponent.loggedIn;
  }
  get userName(){
    return AppComponent.userName;
  }
  get cartItems(){
    return AppComponent.cartItems;
  }
  onLogIn(){
    AppComponent.loggedIn = true;
    AppComponent.userName = sessionStorage.getItem("userName");
    this.updateCartCount();
  }
  updateCartCount(){ 
    this.cartService.viewCart().subscribe(success=>{
    sessionStorage.setItem("cartCount",success.message.length+"");
    AppComponent.cartItems = sessionStorage.getItem("cartCount");},
    error=>{ 
      sessionStorage.setItem("cartCount","0");
      AppComponent.cartItems = sessionStorage.getItem("cartCount");});
  }
  logout(){
    sessionStorage.setItem("userName","");
    sessionStorage.setItem("userId","");
    AppComponent.loggedIn = false;
    sessionStorage.setItem("email","");
    AppComponent.userName = "";
    this.router.navigate(['/products']);
    document.defaultView.location.reload();

  }

}
