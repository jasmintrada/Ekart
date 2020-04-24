import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from './login';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:Login;
  errorMessage:string;
  constructor(private userService:UserService,private router:Router,private cartService:CartService) {
      this.login = new Login();
   }

  ngOnInit(): void {
  }
  onLogin(){
    this.errorMessage = "";
    this.userService.validateUser(this.login).subscribe(success=>{
      sessionStorage.setItem("userName",success.message.userName);
      sessionStorage.setItem("email",success.message.emailId);
      sessionStorage.setItem("userId",success.message.id);
      this.userService.onLogIn();
      this.router.navigate(['/products']);
  },error=>this.errorMessage = error.error.message);
    
  }

}
