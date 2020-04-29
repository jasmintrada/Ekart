import { Component, OnInit } from '@angular/core';
import { Address } from '../Address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  FormTitle:string = "Add";
  address:Address;
  states:Array<string> = [];
  countries:Array<string>=[];
  addresses:Array<Address>=[];
  errorMessage:string="";
  constructor(private addressService:AddressService) { 
    sessionStorage.setItem("userId","1");
    
  }

  updateAddressPopUp(address:Address){
    this.address = address;
    this.FormTitle = "Update";
  }


  addAddressPopUp(){
    this.address = new Address();
    this.getCountries();
    this.FormTitle = "Add";
  }

  ngOnInit(): void {
    this.address = new Address();
    this.addressService.getAddresses().subscribe(success=>{
      this.addresses = success;
    },error=>{
      this.errorMessage = error.message;
      this.addresses=[];
    });
    this.getCountries();
  }
  getCountries(){
    this.addressService.getCountries().subscribe(success=>{
      this.countries = success;
      this.address.country = this.countries[0];
      this.changeStates();
    });
  }
  updateAddress(){
    this.addressService.updateAddress(this.address).subscribe(
        success=>{
          this.addresses = success;
        },error=>{
          this.addresses=[];
        });
  }
  addAddress(){
    if(this.addresses.length==0){
      this.address.defaultAddress = true;
    }else{
      this.address.defaultAddress = false;
    }
    this.address.userId = +sessionStorage.getItem("userId");
    this.addressService.addAddress(this.address).subscribe(
        success=>{
          this.addresses = success;
        },error=>{
          this.addresses=[];
        });
  }
  setDefaultAddress(addressId:number){
    this.addressService.setDefaultAddress(addressId).subscribe(success=>{
      this.addresses = success;
    },error=>{
      this.addresses=[];
    });
  }

  deleteAddress(addressId:number){
    this.addressService.deleteAddress(addressId).subscribe(success=>{
      this.addresses = success;
    },error=>{
      this.addresses=[];
    });
  }

  changeStates(){
    this.addressService.getStates(this.address.country).subscribe(
      success=>{
        this.states = success;
        this.address.state = this.states[0];
      }
    );
  }

}
