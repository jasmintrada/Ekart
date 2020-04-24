import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../Cart';
import { Product } from '../Product';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartDetails:Array<Cart>;
  cartId:number;
  errorMessage:string;
  deliveryCharge:number = 0;
  constructor(private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
    
    this.cartService.viewCart().subscribe(success=>{
      this.cartDetails = success.message;
      let totalItems = this.cartDetails.length;
      if(totalItems==0){
        this.errorMessage = "You Do not have any items in the cart.";
      }
      sessionStorage.setItem("cartCount",totalItems+"");
      for(let i=0;i<this.cartDetails.length;i++){
        this.deliveryCharge+=this.cartDetails[i].product.deliveryCharge;
      }
    },error=>this.errorMessage=error.error.message);
  }

  updateCart(cart:Cart) {
    if(cart.quantity>4){
      cart.quantity=4;
    }
      this.cartService.updateCart(cart);
        
    document.defaultView.location.reload();
  }

remove(index: number) {
    index = this.cartDetails[index].product.id;
    this.cartService.removeCart(index).subscribe(success=>{
      this.cartDetails = success.message;
      new AppComponent(this.router,this.cartService).updateCartCount();
    },error=>{this.cartDetails=[];
      new AppComponent(this.router,this.cartService).updateCartCount();});
}

onBack(): void {
    this.router.navigate(['/products']);
}

checkout() {
}

}
