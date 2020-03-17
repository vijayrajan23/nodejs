import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AppServiceService} from '../app-service.service';


@Component({
   // selector: 'hello',
    templateUrl: 'payment.shopping-cart.component.html',
  })

  export class PaymentShoppingCartComponent implements OnInit{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    amount: number;
    productinfo: string;
    txnid: number;
    surl: string;
    furl: string;
    public data;  
    total_amount:any;
    constructor(
      private _appservice : AppServiceService,
      ) { 
       
        this.txnid = this.getRandomInt();
      }
      getRandomInt() {
        return Math.floor(100000 + Math.random() * 900000);
      }
  
        paymentForm = new FormGroup({
          firstname : new FormControl(''),
          lastname : new FormControl(''),
          email : new FormControl(''),
          phone : new FormControl(''),
          amount : new FormControl(''),
          productinfo : new FormControl('')
        });
  
    ngOnInit() {  
      this.data = this._appservice.getOption(); 
      this.total_amount = this.data.reduce((sum, item) => sum + item.amount, 0);
      console.log(this.data)  
      this.paymentForm.patchValue({
        firstname : 'vijay',
        lastname :'s',
        email : 'vijaylaxman1994@gmail.com',
        phone : '8508043020',
        amount :this.total_amount,
        productinfo : 'food'
      })
    }
    onSubmit() {
                this._appservice.createPayment(this.paymentForm.value).subscribe(
                  res => {
                    this.onPaymentSuccess(res['payment_link']);
                  },
                  err => {
                    console.log('nn');
                  }
                );
    }

    onPaymentSuccess(data: any) {
      window.location.href = data;
    }
}