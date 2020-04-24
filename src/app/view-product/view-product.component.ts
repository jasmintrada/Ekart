import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { Cart } from '../Cart';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  imageWidth = 350;
  imageHeight = 550;
  imageMargin = 5;
  product:Product;
  sub: any;
  error:string;
  cartBtnName:string;
  quantity:number = 1;
  maxQty:number = 4;
  constructor(private prodService: ProductService, private route: ActivatedRoute,private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
    this.cartBtnName = "Add to Cart";
    this.sub = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
    this.prodService.getSpecificProduct(+params.get('id')))).subscribe(product => this.product = product.message,error=>this.error = error.message);
  }

  addToCart(product:Product){
    if(this.cartBtnName=="Add to Cart"){
      let cart:Cart = new Cart();
      cart.product = product;
      if(this.quantity>this.maxQty){
        this.quantity=this.maxQty;
      }
      cart.quantity = this.quantity;
      this.cartService.addToCart(cart);
      this.cartBtnName = "View Cart";
      setTimeout(()=>{
      new AppComponent(this.router,this.cartService).updateCartCount();},100);
      
    }else{
      this.router.navigate(["/viewCart"]);
    }
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ratingDes(rating:number,i:number):string{
    if(i<=rating){
      return "glyphicon glyphicon-star";
    }else if(i-rating<1){
      return "glyphicon glyphicon-star half";
    }else{
      return "glyphicon glyphicon-star-empty";
    }
  }
}
