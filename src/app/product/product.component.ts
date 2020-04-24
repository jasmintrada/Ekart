import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  imageWidth = 80;
  imageHeight = 120;
  imageMargin = 12;
  productList:Array<Product>;
  errorMessage:string;
  searchText:string;
  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.errorMessage="";
    this.productList=[];
    this.productService.getAllProducts().subscribe(success=>{
      this.productList = success.message;
    },error=>this.errorMessage="Something Went Wrong, Plese Try Again Later.");
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
  viewProduct(id:number){
    this.router.navigate(['/viewProduct',id]);
  }
  searchProduct(){
    this.errorMessage="";
    this.productList=[];
    this.productService.getProductsByName(this.searchText?this.searchText:"all").subscribe(success=>{
      this.productList = success.message;
    },error=>this.errorMessage=error.error.message);
  }
}
