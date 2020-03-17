import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';



@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  data1: any;
  btn_enable=1;
  number_rec: any;

  
  constructor(private AppServiceService: AppServiceService,private fb:FormBuilder) { }
 
  public addresses: FormArray;
  public addressForm: FormGroup;
  region_data:any;
  client_data:any;
  customer_data:any;
  client_id: any;
  transaction:any;
  data:any;
  par_transaction:any;
  receipt_upload:FormGroup;
  form:FormGroup;
  fileData:File;
  previewUrl:any;
  view_data:any;
  ngOnInit() {
        this.receipt_upload=this.fb.group({
              Transaction_type : [''],
              Transaction_status : [''],
              Region_Name : [''],
              Date : [''],
              Client_Name : [''],
              Customer_Name : [''],
              CEs_Name : ['']
        })
        this.addressForm=this.fb.group({
          ap_status : [''],
          tx_id : [''],
        })
      

        this.AppServiceService.find_regions().subscribe(
          ( get_regions )=> {
            this.region_data=get_regions;
          },
        (error)  => {
            console.log(error);
        });
        this.AppServiceService.find_client().subscribe(
          ( get_client )=> {
            this.client_data=get_client;
          },
        (error)  => {
            console.log(error);
        });
       
        this.AppServiceService.find_trans_at_load().subscribe(
          (data)=>{
            this.data=data;
            console.log(data)
          },
          (error)=>{}
        )
  }
  getCustomer(event){
        this.client_id= event.target.value;
        this.AppServiceService.find_customer(this.client_id).subscribe(
          ( get_customer ) => {
            this.customer_data=get_customer;  
          },
          ( error ) => {}
        )      
  }
  getTransaction(qry){
    console.log(this.receipt_upload.value);
        this.AppServiceService.getTransaction(this.receipt_upload.value ).subscribe(
         (getTransaction)=> {
            this.data=getTransaction;
           },
           (error)=> {}
        );
  }
  
  @ViewChild('try',{static:true}) receipt:ModalDirective
  openDialog(id){
    //this.previewUrl ="assets/images/";
    this.AppServiceService.receiptView(id).subscribe((data)=>{
    this.view_data=data;
    console.log(data)

    this.addressForm.patchValue({tx_id : data[0].transaction_id})
    })
    this.receipt.show();
  }

  
  
  submit_receipt(){
    console.log(this.addressForm.value)
    this.AppServiceService.approveStatus(this.addressForm.value).subscribe((data)=>{
     this.ngOnInit();
    });

  }

}