import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  allProductsUrl:string="http://localhost:5000/product/getProducts";
  specificProductUrl:string="http://localhost:5000/product/";
  productByNameUrl:string="http://localhost:5000/product/name/";


  constructor(private httpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.httpClient.get<any>(this.allProductsUrl);
  }

  getSpecificProduct(productId:number):Observable<any>{
    return this.httpClient.get<any>(this.specificProductUrl+productId);

  }

  getProductsByName(productName:String):Observable<any>{
    return this.httpClient.get<any>(this.productByNameUrl+productName);

  }
}
