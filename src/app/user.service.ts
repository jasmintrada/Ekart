import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AppComponent} from './app.component';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import {RestURL} from './RestAPIURL';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUrl:string= RestURL.url +"user/login";
  signUpUrl:string= RestURL.url +"user/signUp";
  updateUrl:string= RestURL.url +"user/update";

  constructor(private http:HttpClient, private router:Router,private cartService:CartService) {
  }

  validateUser(data):Observable<any>{
    return this.http.post<any>(this.loginUrl,data);
  }

  registerUser(data):Observable<any>{
    
    return this.http.post<any>(this.signUpUrl,data); 
  }

  updateUser(data):Observable<any>{
    return this.http.post<any>(this.updateUrl,data);
  }

  onLogIn(){
    new AppComponent(this.router,this.cartService).onLogIn();
  }

}
