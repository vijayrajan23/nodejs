import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AppServiceService} from '../app-service.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  get_regions: any;
  get_customer: any;
  client_view : FormGroup;
  data: any;

  constructor(private fb : FormBuilder ,private _appService: AppServiceService) { }
  
  ngOnInit() {
    this.client_view= this.fb.group({
      regionId :['',Validators.required],
      customerId :['',Validators.required],
      serviceType :['',Validators.required],
      depositType :['',Validators.required],
      Date :['',Validators.required]
    });

    // get regions Detils Goes Here...
    let region='';
    this._appService.getRegion(region).subscribe(
      (regions)=>{ this.get_regions=regions; });

    // Get Client Customers Detils Goes Here...
      this._appService.getclientCust().subscribe(
        (customers)=>{ 
          this.get_customer=customers; 
      });

      }
      onSubmit()
      {
       this._appService.get_clientCustData(this.client_view.value).subscribe(
         (data)=>{
         this.data = data;
         }
         );
      }
 
   
      
      
    
}
