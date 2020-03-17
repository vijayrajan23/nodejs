import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private apiUrl ='http://18.209.99.140:3008/'
  private apiUrl_1 ='http://18.209.99.140:3010/' 
  constructor( private HttpClient : HttpClient) { }
   
  getRegion(getRegion){
    return this.HttpClient.post(this.apiUrl+'get_region',getRegion); 
  }

  getLocation(getLocation){
    return this.HttpClient.post(this.apiUrl+'get_location',getLocation); 
  }
  getClient(getClient){
    return this.HttpClient.post(this.apiUrl+'get_client',getClient); 
  }
  getCustomer(clientId){
    return this.HttpClient.post(this.apiUrl+'get_customer',{clientId :clientId}); 
  }
  getShopInfo(customerId){
    return this.HttpClient.post(this.apiUrl+'get_shopinfo',{custId :customerId}); 
  }


/// onload get customer information raman 2020-02-07
  getCustomerInfo(){
    return this.HttpClient.post(this.apiUrl+'get_customer_onload'); 
  }
  insertShopInfo(shopData){
    return this.HttpClient.post(this.apiUrl+'shopData',shopData); 

  } 
  getShopData(){
    return this.HttpClient.post(this.apiUrl+'get_shop_onload'); 

  } 
  deleteShop(shopId){
    return this.HttpClient.post(this.apiUrl+'deleteShop',{shopId:shopId}); 

  } 
  updateShopInfo(shopUpdateData){
    return this.HttpClient.post(this.apiUrl+'UpdateShop',shopUpdateData); 

  } 
 // raman end 2020-02-07

  pushTransaction(tansactions){
    return this.HttpClient.post(this.apiUrl+'push_trans',tansactions); 
  }
  // ragu bulk upload using xlsx
  bulkTransaction(tansactions){
    return this.HttpClient.post(this.apiUrl+'bulk_trans',tansactions); 
  }

  /// selva 

  //user info
  get_userinfo()
  {
    return this.HttpClient.post(this.apiUrl+'get_userinfo');
  }

  //login
  get_loginUser(usrname: any)
  {
    return this.HttpClient.post(this.apiUrl+'loginUserInfo', usrname);
  }
  //user info Add
  get_userinfoAdd(datas: any)
  {
    return this.HttpClient.post(this.apiUrl+'userinfoAdd',datas);
  }
   //user info Update
   userinfoUpdate(datas: any,id)
   {
     return this.HttpClient.post(this.apiUrl+'userinfoUpdate',datas,id);
   }
  //user info delete
  get_userinfoDelete(id: any)
  {
    return this.HttpClient.post(this.apiUrl+'userinfoDelete',{id: id});
  }
  
 //get_clientCustomerName
 getclientCust()
 {
   return this.HttpClient.post(this.apiUrl+'get_clientCustomer')
 }
 //get_clientCustomerData
 get_clientCustData(info: any)
 {
   return this.HttpClient.post(this.apiUrl+'get_clientCustomerData',info);
 }

  /// selva end

  // vijay start
  register_form(register){
    return this.HttpClient.post(this.apiUrl+'register',register);
  }
  push_transaction_view_at_load(){
        return this.HttpClient.post(this.apiUrl+'push_at_load_transaction')
    }
    deleteTransaction(id){
    return this.HttpClient.post(this.apiUrl+'delete_transaction',{id:id})
    }
    updateTransaction(update_tx){
     console.log(update_tx)
     return this.HttpClient.post(this.apiUrl+'update_transaction_view',update_tx)
    }

  find_regions(){
   
      return this.HttpClient.post(this.apiUrl+'region_data')
  }
  find_client(){

      return this.HttpClient.post(this.apiUrl+'client_data')
  }
  find_customer(client_id){

      return this.HttpClient.post(this.apiUrl+'customer_data',{client_id: client_id})
  }
  find_transaction_at_load(){

      return this.HttpClient.post(this.apiUrl+'at_load_transaction')
  }
  getTransaction(filter_data){

     return this.HttpClient.post(this.apiUrl+'transaction',filter_data)
  }
  // end 
  submit_receipt(receipt_data){
    return this.HttpClient.post(this.apiUrl+'submit_receipt',receipt_data)
  }
  upload_reciept(formData){
    return this.HttpClient.post(this.apiUrl+'upload_reciept',formData)
  }

  // view trans

   //Receipt View
   find_trans_at_load(){
    return this.HttpClient.post(this.apiUrl+'trans');
   }
   receiptView(trans_id){
    return this.HttpClient.post(this.apiUrl+'view_trans',{trans_id:trans_id});
   }
   approveStatus(trans_id){
    return this.HttpClient.post(this.apiUrl+'approve_status',trans_id);
   }

  ///shoping cart
   add_user_cart(user_register){
    console.log(user_register)
    return this.HttpClient.post(this.apiUrl+'add_user_cart',user_register);
   }

   get_product_for_display(cn){
     return this.HttpClient.post(this.apiUrl+'get_product_for_display',{country:cn});
   }
   createPayment(payment_details) {
   // const PAYMENT_URL = '/payment/pay';
   console.log(payment_details)
   return this.HttpClient.post(this.apiUrl+'pay',payment_details);
  }
  ////////////////////////
    private data:any=[];  
    
    setOption(value) {      
      this.data = value;  
    
    }  
    
    getOption() {  
     // console.log( this.data) 
      return this.data; 

    }

    get_pan_loaction(){

        return this.HttpClient.post(this.apiUrl+'location',{state:'all'})
      }
      get_pan_state(){
        return this.HttpClient.post(this.apiUrl_1+'state')
      }
      state_filter(state){
        return this.HttpClient.post(this.apiUrl_1+'location',{state:state})
      }
    //////////////////////////////

    find_ip(ip){
    
      return this.HttpClient.post(this.apiUrl+'find_ip',{ip_address:ip});

    }
   location_data(){
    return this.HttpClient.post(this.apiUrl_1+'location_data');
  }

}
