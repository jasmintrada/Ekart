import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductComponent } from './product/product.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"signUp",component:SignupComponent},
  {path:"welcome",component:WelcomeComponent},
  {path:"products",component:ProductComponent},
  {path:"updateProfile",component:UpdateProfileComponent},
  {path:"viewProduct/:id",component:ViewProductComponent},
  {path:"viewCart",component:CartComponent},
  {path:"",redirectTo:"/welcome",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
