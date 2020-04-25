import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestURL } from './RestAPIURL';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {


  recommendUrl:string = RestURL.url +'orderDetails/purchasedProduct/';

  constructor(private http:HttpClient) { }

  getProducts(id:number):Observable<any>{
    return this.http.get<any>(this.recommendUrl+id);
  }

}
