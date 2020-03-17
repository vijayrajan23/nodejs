import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';



@Component({
  selector: 'app-receipt-upload',
  templateUrl: './receipt-upload.component.html',
  styleUrls: ['./receipt-upload.component.css']
})
export class ReceiptUploadComponent implements OnInit {
  btn_enable: any;
  
  constructor(private AppServiceService: AppServiceService,private fb:FormBuilder) { }
 
  public addresses: FormArray;
  public addressForm: FormGroup;
  region_data:any;
  client_data:any;
  customer_data:any;
  client_id: any;
  transaction:any;
  fileData_name:any;
  data:any;
  par_transaction:any;
  receipt_upload:FormGroup;
  form:FormGroup;
  fileData:File;
  filevalue:File;
  previewUrl:any;
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

        this.addressForm = this.fb.group({
              Transaction_id:'',
              addresses: this.fb.array([ ])
        });

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
        this.AppServiceService.find_transaction_at_load().subscribe(
          (data)=>{
            this.data=data;
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
           console.log(getTransaction)
            this.data=getTransaction;
           },
           (error)=> {}
        );
  }

  @ViewChild('try',{static:true}) receipt:ModalDirective
  openDialog(id){
    ////////clear everything befor add new one//////
      this.addressForm.reset();
      this.addresses = this.addressForm.get('addresses') as FormArray;
      this.addresses.clear()
     /////////end/////
    this.par_transaction=this.data[id];
    let control = this.addressForm.controls['addresses']  as FormArray
   
    control.push(this.fb.group({
      amount:this.par_transaction.amount,
      type_deposite:'',
      receipt_no:'',
      dep_branch:'',
      remark1:'',
      region_remark:'',
      collection_remark:'',
      Scan_image:''
  }));
  this.addressForm.patchValue({
    Transaction_id:this.par_transaction.id
  })
    console.log(this.par_transaction.id);
    this.receipt.show();
  }
 
  createAddress(): FormGroup {
    return this.fb.group({
      amount:'',
      type_deposite:'',
      receipt_no:'',
      dep_branch:'',
      remark1:'',
      region_remark:'',
      collection_remark:'',
      Scan_image:''
    });
  }

  increment(): void {
    ++this.btn_enable;
   // this.addressForm.reset();
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }
  removeAddress(i: number) {
    --this.btn_enable;
    this.addresses.removeAt(i);
  }
  file_pre(fileInput:any,i){
              this.fileData = fileInput.target.files[0];
              var reader = new FileReader();      
              reader.readAsDataURL(this.fileData);
              reader.onload = (_event) => { 
                  this.previewUrl = reader.result; 
                  var b = document.querySelector(".img_"+i+""); 
                  b.setAttribute("src",""+reader.result+"");
              }
  }
 
  submit_receipt(){
    const formData = new FormData();
    formData.append('scan_image', this.fileData); 
    this.AppServiceService.upload_reciept(formData).subscribe(
      (data1) => {   }
    )
    this.AppServiceService.submit_receipt(this.addressForm.value).subscribe(
      (data)=> {
        this.ngOnInit();
      },
      (error) => {}
    )
  }

}