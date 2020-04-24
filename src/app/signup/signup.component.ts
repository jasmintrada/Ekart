import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  errorMessage:string;
  successMessage:string;

  constructor(private formBuilder:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
      this.signUpForm = this.formBuilder.group({
        name:['',[Validators.required,this.validateName]],
        email:['',[Validators.required,this.validateEmail]],
        password:['',[Validators.required,this.validatePassword]],
        confirmPassword:['',Validators.required],
        accountType:['Buyer',Validators.required]
      });
      this.signUpForm.setValidators(this.matchPassword);
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
  matchPassword(group:FormGroup){
    if(group.get("password").value==group.get("confirmPassword").value)return null;
    return {invalidPassword:{message:"Password and Confirm Password are not matching."}};
  }
  validateName(tmp:FormControl){
    let name = /^[a-zA-Z]*$/;
    return name.test(tmp.value)?null:{
      invalidName:{
        message : "Name contains invalid character"
      }
    };
  }
  validateEmail(c: FormControl) {
    let EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return EMAIL_REGEXP.test(c.value) ? null : {
        emailInvalid: {
            message: "Invalid Format!"
        }
    };
}

  signUp(){
//    alert(this.signUpForm.controls.accountType.value);
  this.successMessage = "";
  this.errorMessage = "";  
  let data = {"emailId":this.signUpForm.controls.email.value,"userName":this.signUpForm.controls.name.value,'password':this.signUpForm.controls.password.value,"accountType":this.signUpForm.controls.accountType.value};
    this.userService.registerUser(data).subscribe(
      success=>this.successMessage=success.message,error=>this.errorMessage = error.error.message);
  }

}
