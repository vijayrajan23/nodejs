import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import {AppServiceService} from '../app-service.service';
import * as XLSX from 'xlsx';
type AOA = any[][];
import * as  moment from 'moment';
@Component({
  selector: 'app-add-new-transaction',
  templateUrl: './add-new-transaction.component.html',
  styleUrls: ['./add-new-transaction.component.css']
})

export class AddNewTransactionComponent implements OnInit {
  get_regions: any;
  get_location: any;
  get_clients: any;
  get_customer: any;
  get_shops: any;
  trnsaComplete: any;
  data: any;
  up_but=false ;
  sub_but=true ;
  constructor(private fb : FormBuilder ,private _appService: AppServiceService) { }
  add_transaction : FormGroup;
  // form: FormGroup;
  ngOnInit() {

    // this.form = this.fb.group({
    //   searchTxt: '',
    // })

    this.add_transaction= this.fb.group({
      tx_id :[''],
      regionName :[''],
      clientName :[''],
      customerName :[''],
      shopCode :[''],
      shopName :[''],
      pickupType :[''],
      pickupDate :[''],
      pickupAmount :[''],
      ceName :[''],
    });
  
    // get regions Detils Goes Here...
        let region='';
        this._appService.getRegion(region).subscribe(
          (regions)=>{ this.get_regions=regions; });

    // get locations Detils Goes Here...
        let location='';
        this._appService.getLocation(location).subscribe(
          (locations)=>{ this.get_location=locations; });
          
    // get clients  Detils Goes Here...
        let client='';
        this._appService.getClient(client).subscribe(
          (client)=>{ this.get_clients=client; });
          
          this._appService.push_transaction_view_at_load().subscribe(
            (data)=>{
              this.data=data;
            },
            (error)=>{}
          )

  }

     // Get Customers Detils Goes Here...
       getCustomer(clientId){
        this._appService.getCustomer(clientId).subscribe(
          (customers)=>{ this.get_customer=customers; });
       }

     // Get Shop Detils Using customer Id Goes Here...
       getShopName(customerId){
        this._appService.getShopInfo(customerId).subscribe(
          (shop)=>{ this.get_shops=shop; });
       }

        onSubmit(){
          console.log(this.add_transaction.value);
          this._appService.pushTransaction(this.add_transaction.value).subscribe(
            (shop)=>{ this.trnsaComplete=shop; this.add_transaction.reset();  this.ngOnInit(); });
        }


        // tranaction updates

        updtae_trans(id){
          this.sub_but=false;
          this.up_but=true;
          console.log(this.data)
          this.getCustomer(this.data[id].client_id);
          this.getShopName(this.data[id].customer_id);

         var ddd= moment.utc(this.data[id].transaction_date).format('YYYY-MM-DD');
       
          this.add_transaction.patchValue({
            tx_id :this.data[id].id,
            regionName :this.data[id].region_id,
            locationName :this.data[id].location_id,
            clientName :this.data[id].client_id,
            customerName :this.data[id].customer_id,
            shopCode :this.data[id].shop_id,
            shopName :this.data[id].shop_name,
            pickupType :this.data[id].deposit_type,
            pickupDate :ddd,
            pickupAmount :this.data[id].amount,
            ceName :this.data[id].ce_id,
         
          });
        }  
  delete_trans(id){
          this._appService.deleteTransaction(id).subscribe(
            (data)=>{ 
             this.ngOnInit();
            }
          );
        }
onUudate(){
          //console.log(this.add_transaction.value);
          this._appService.updateTransaction(this.add_transaction.value).subscribe(
            (shop1)=>{
              this.trnsaComplete=shop1; this.add_transaction.reset();
              this.sub_but=true;
              this.up_but=false;
              this.ngOnInit();
             
            }
          );
        }


        ///  import end insert into database

        datas: AOA = [];
        wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
        fileName: string = 'SheetJS.xlsx';
      
        onFileChange(evt: any) {
          /* wire up file reader */
          const target: DataTransfer = <DataTransfer>(evt.target);
          if (target.files.length !== 1) throw new Error('Cannot use multiple files');
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      
            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      
            /* save data */
            this.datas = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            console.log(this.datas);
          };
          reader.readAsBinaryString(target.files[0]);
        }
      
      
       
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }
        onImport(){
      this._appService.bulkTransaction(this.datas).subscribe(
        (shop)=>{  });
      
      
      }

}
