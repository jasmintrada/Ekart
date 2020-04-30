import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { DealsComponent } from './deals/deals.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AddressComponent } from './address/address.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { PhoneValidator } from './address/phoneno.validator';
import { UserValidator } from './address/username.validator';
import { PincodeValidator } from './address/pincode.validator';
import { OrderComponent } from './order/order.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    ProductComponent,
    UpdateProfileComponent,
    DealsComponent,
    RecommendationsComponent,
    AddressComponent,
    ViewProductComponent,
    CartComponent,
    PhoneValidator,
    UserValidator,
    PincodeValidator,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
