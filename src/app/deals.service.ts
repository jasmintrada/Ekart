import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealsService {


  dealsUrl:string = "http://localhost:5000/deals/getDeals/";

  constructor(private http:HttpClient) { }

  getDeals():Observable<any>{
    return this.http.get<any>(this.dealsUrl+"Apr-20-2020");
  }
  
}
