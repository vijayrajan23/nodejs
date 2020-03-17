import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service';
@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
      addShop : FormGroup;
      customer: Object;
      submitted = false;
      results: any;
      data: any;
      sub_btn=true;
      update_btn=false;
  showInsert= false;
  showUpdate= false;
  showDelete= false;
  constructor(private fb : FormBuilder,private _appService: AppServiceService) {
  
   }
  //  changeLabelName(ss){
  //     var ss1=ss+1;
  //     document.getElementById('ss').innerHTML = ss1;
  //  }
  
  ngOnInit() {
    
    
    this.addShop=this.fb.group({
      shopId:[''],
      customerName :['',[Validators.required]],
      divName :['',[Validators.required]],
      pointPinCode :['',[Validators.required,Validators.maxLength(6),Validators.minLength(6)]],
      pointLocation :['',[Validators.required]],
      radiantLoiId :['',[Validators.required]],
      loiDate :['',[Validators.required]],
      customerCode :['',[Validators.required]],
      customerPointCode :['',[Validators.required]],
      pointLocationCode :['',[Validators.required]],
      pointName :['',[Validators.required]],
      pointAddress :['',[Validators.required]],
      pointHierarchy :['',[Validators.required]],
      pointSubCusCode :['',[Validators.required]],
      pointSolId :['',[Validators.required]],
      pointDivCode :['',[Validators.required]],
      pointPhoneNo :['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      pointContactName :['',[Validators.required]],
      pointMobileNo :['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      pointEmail :['', [Validators.required, Validators.email]],
      pointServiceType :['',[Validators.required]],
      pointCashLimit :['',[Validators.required]],
      pointBankType :['',[Validators.required]],
      pointPickupType :['',[Validators.required]],
      pointType :['',[Validators.required]],
      pointActivateDate :['',[Validators.required]],
      pointDeactivationDate :['',[Validators.required]],
    });

      
    this._appService.getCustomerInfo().subscribe(
      (data)=>{
        this.customer=data;
      },
      (error)=>{}
    )
    setTimeout(() => {  
    this._appService.getShopData().subscribe(
      (data)=>{
        this.data=data;
        console.log(this.data)
      },
      (error)=>{}
    )
  }, 2000)
   
  }
  get f() { return this.addShop.controls; }
  onSubmit(){
    
    this.submitted = true;
    if(this.addShop.invalid) return;
    console.log(this.addShop.value);
    this._appService.insertShopInfo(this.addShop.value).subscribe(
      (data)=>{
        this.results=data;
        this.ngOnInit();
        this.showInsert = true;
        setInterval(() => {  
          this.showInsert = false;
        }, 3000);
        this.submitted = false;
        this.addShop.reset();
      },
      (error)=>{
        this.showInsert = false;
      }
    )
  }
  deleteShop(shopId){
  if(confirm("Are you sure to delete RSC"+shopId)) {
    this._appService.deleteShop(shopId).subscribe(
      (data)=>{
      this.showDelete = true;
        setInterval(() => {  
          this.showDelete = false;
        }, 3000);
        this.results=data;
        this.ngOnInit();
      },
      (error)=>{ this.showDelete = false;}
    )
    }
  }
  editShop(id){
    this.sub_btn=false;
    this.update_btn=true;
    this.addShop.patchValue({
      shopId:this.data[id].shop_id,
      customerName:this.data[id].cust_id,
      divName:this.data[id].div_name,
      pointPinCode:this.data[id].point_pincode,
      pointLocation:this.data[id].point_location,
      radiantLoiId:this.data[id].radiant_loi_id,
      loiDate:this.data[id].loi_date,
      customerCode:this.data[id].customer_code,
      customerPointCode:this.data[id].customer_pointcode,
      pointLocationCode:this.data[id].point_location_code,
      pointName:this.data[id].point_name,
      pointAddress:this.data[id].point_address,
      pointHierarchy:this.data[id].point_hierarchy,
      pointSubCusCode:this.data[id].point_subcus_code,
      pointSolId:this.data[id].point_sol_id,
      pointDivCode:this.data[id].point_div_code,
      pointPhoneNo:this.data[id].point_phoneno,
      pointContactName:this.data[id].point_contact_name,
      pointMobileNo:this.data[id].point_mobile_no,
      pointEmail:this.data[id].point_email,
      pointServiceType:this.data[id].point_servicetype,
      pointCashLimit:this.data[id].point_cash_limit,
      pointBankType:this.data[id].point_bank_type,
      pointPickupType:this.data[id].point_pickup_type,
      pointType:this.data[id].point_type,
      pointActivateDate:this.data[id].point_activatio_date,
      pointDeactivationDate:this.data[id].point_deactivate_date
    })
  }
  onUpdate(){
    this.sub_btn=true;
    this.update_btn=false;
    this._appService.updateShopInfo(this.addShop.value).subscribe(
      (data)=>{
       this.showUpdate = true;
        setInterval(() => {  
          this.showUpdate = false;
        }, 3000);
        this.submitted = false;
        this.results=data;
        this.addShop.reset();
        this.ngOnInit();
      },
      (error)=>{  this.showUpdate = false;}
    )
  }
}
