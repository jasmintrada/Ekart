import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';
import { Observable } from 'rxjs';
import { RestURL } from './RestAPIURL';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  allProductsUrl:string= RestURL.url +"product/getProducts";
  specificProductUrl:string= RestURL.url +"product/";
  productByNameUrl:string= RestURL.url +"product/name/";


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
