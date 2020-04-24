import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {


  errorMessage:string;
  deals:Array<any>;

  constructor(private dealService:DealsService) { }

  ngOnInit(): void {
    this.dealService.getDeals().subscribe(success=>{
      this.deals = success.message;
    },error=>this.errorMessage = error.error.message);
  }

}
