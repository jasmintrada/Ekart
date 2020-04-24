import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {


  recommendUrl:string = 'http://localhost:5000/orderDetails/purchasedProduct/';

  constructor(private http:HttpClient) { }

  getProducts(id:number):Observable<any>{
    return this.http.get<any>(this.recommendUrl+id);
  }

}
