import { Component, OnInit } from '@angular/core';
import { Address } from '../Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  FormTitle:string = "Add";
  address:Address = new Address();
  states:Array<string>;
  countries:Array<string>;
  addresses:Array<Address>=[];
  constructor() { 
    this.states = ['Gujarat','Maharashtra','Rajasthan','Andhra Pradesh','Tamilnadu'];
    this.countries = ['India'];
    let address = new Address();
    
    address.userName = "Jasmin Trada";
    address.addressLine1="A-20, Ila Society, India Colony Road";
    address.addressLine2 = "";
    address.city="Ahmedabad";
    address.state = "Gujarat";
    address.country = "India";
    address.pincode = "382350";
    address.phoneNo = 7698564894;
    address.locality = "Bapuagar";
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
    this.addresses.push(address);
  }

  updateAddressPopUp(address:Address){
    this.address = address;
    this.FormTitle = "Update";
  }


  addAddressPopUp(){
    this.address = new Address();
    this.FormTitle = "Add";
  }

  ngOnInit(): void {
  }

}
