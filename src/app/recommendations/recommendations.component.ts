import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../recommendations.service';
import { Product } from '../Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {


  productList:Array<any>;
  errorMessage:string;
  imageWidth = 80;
  imageHeight = 120;
  imageMargin = 12;

  constructor(private service:RecommendationsService,private router:Router) { }

  ngOnInit(): void {
    this.errorMessage = "";
    this.productList = [];
    if(sessionStorage.getItem("userId")){
      this.service.getProducts(+sessionStorage.getItem("userId")).subscribe(
        success=>{this.productList = success.msg;},
        error=>this.errorMessage = error.error.message);
    }else{
      this.errorMessage = "Advertisement";
    }
  }
  
  viewProduct(id:number){
    this.router.navigate(['/viewProduct',id]);
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
