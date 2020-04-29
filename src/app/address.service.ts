import { Injectable } from '@angular/core';
import {RestURL} from './RestAPIURL';
import { HttpClient } from '@angular/common/http';
import { Address } from './Address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  getAddressUrl:string = RestURL.url+'address/getAddress/';
  addAddressUrl:string = RestURL.url+"address/saveAddress";
  updateAddressUrl:string = RestURL.url+"address/updateAddress";
  deleteAddressUrl:string = RestURL.url+"address/delete/";
  setDefaultAddressUrl:string = RestURL.url+"address/setDeafult/";
  getCountriesUrl:string = RestURL.url+"location/country";
  getStatesUrl:string = RestURL.url+"location/states/";
  
  constructor(private http:HttpClient) { }


  getAddresses():Observable<Array<Address>>{
    let userId = sessionStorage.getItem("userId");
    return this.http.get<Array<Address>>(this.getAddressUrl+userId);
  }

  updateAddress(address:Address):Observable<Array<Address>>{
    return this.http.post<Array<Address>>(this.updateAddressUrl,address);
  }

  addAddress(address:Address):Observable<Array<Address>>{
    return this.http.post<Array<Address>>(this.addAddressUrl,address);
  }

  deleteAddress(id):Observable<Array<Address>>{
    let userId = sessionStorage.getItem("userId");
    return this.http.get<Array<Address>>(this.deleteAddressUrl+id+"/"+userId);
  }

  setDefaultAddress(id):Observable<Array<Address>>{
    let userId = sessionStorage.getItem("userId");
    return this.http.get<Array<Address>>(this.setDefaultAddressUrl+id+"/"+userId);
  }

  getCountries():Observable<Array<string>>{
    return this.http.get<Array<string>>(this.getCountriesUrl);
  }

  getStates(country:string):Observable<Array<string>>{
    return this.http.get<Array<string>>(this.getStatesUrl+country);
  }

}
