import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateNameForm:FormGroup;
  passwordForm:FormGroup;
  errorMessage:string;
  successMessage:string;

  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
      this.updateNameForm = this.formBuilder.group({
        name:['',[Validators.required,this.validateName]]
      });
      this.passwordForm = this.formBuilder.group({
        password:['',[Validators.required,this.validatePassword]],
        confirmPassword:['',[Validators.required]]
      });
      this.passwordForm.setValidators(this.matchPassword);
  }


  updatePassword(){
    let data = {"password":this.passwordForm.controls.password.value,"emailId":sessionStorage.getItem("email")};
    this.userService.updateUser(data).subscribe(success=>this.successMessage = success.message,error=>alert(error.message));
  }

  

  updateName(){
    let data = {"userName":this.updateNameForm.controls.name.value,"emailId":sessionStorage.getItem("email")};
    this.userService.updateUser(data).subscribe(success=>{
      this.successMessage = success.message;
      sessionStorage.setItem("userName",data.userName);
      this.userService.onLogIn();
    },error=>alert(error.message));
    
  }
  matchPassword(group:FormGroup){
    if(group.get("password").value==group.get("confirmPassword").value)return null;
    return {invalidPassword:{message:"Password and Confirm Password are not matching."}};
  }

  validatePassword(c:FormControl){
    
    let password:string = c.value;
    if(password.length>7){
      if(password.match("[.]*[a-z]+[.]*")&&password.match("[.]*[A-Z]+[.]*")&&password.match("[.]*[0-9]+[.]*")&&password.match("[.]*[\\W]+[.]*")){
        return null;
      }
    }
    return {invalidPassword:{message:"Password length should be more than 7 and should contain at least an uppercase and a lowercase character, a number and a special character"}};
  }

  validateName(tmp:FormControl){
    let name = /^[a-zA-Z]*$/;
    return name.test(tmp.value)?null:{
      invalidName:{
        message : "Name contains invalid character"
      }
    };
  }
  
}
