import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import {AppComponent} from './app.component';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginUrl:string="http://localhost:5000/user/login";
  signUpUrl:string="http://localhost:5000/user/signUp";
  updateUrl:string="http://localhost:5000/user/update";

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
