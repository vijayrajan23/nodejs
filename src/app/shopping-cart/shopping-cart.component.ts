import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  product_display;
  my_cartProduct:any=[];
  dum_cart:any=[];
  list:any=[];
  dd:number;
  dd1:number;
  public cartForm: FormGroup;
  total: any;
  public size: number;  
  public square: number;
  
  constructor(
    private _apiservice:AppServiceService,
    private form:FormBuilder
    ) { 

      
    }

    
  ngOnInit() {
   var cn= localStorage.getItem('country');
   console.log(cn);
    // this.cartForm=this.form.group({
    //   quantity:this.form.array([ ]),
    //   //total_amount:['']
    // })
    this._apiservice.get_product_for_display(cn).subscribe(
      (data) => {
        this.product_display=data;
        console.log( this.product_display);
      }
    )
  }
 

  add_to_cart(ids){ 
                if(this.my_cartProduct.find(obj=>obj.id===this.product_display[ids].id)){
                //  var dd=(document.getElementById('login-menu'+ids) as HTMLInputElement).value;
                //  var dd1=dd+1;
                //   (document.getElementById('login-menu'+ids) as HTMLInputElement).value=dd1;
                //    console.log(dd)
                console.log(this.cartForm);
                }
                else{
                     this.my_cartProduct.push(this.product_display[ids]); 
                     this.dum_cart.push(this.product_display[ids]); 
                     //sum of total amount
                    this.total = this.dum_cart.reduce((sum, item) => sum + item.amount, 0);
           
                }  
               this._apiservice.setOption(this.dum_cart);                   
  }
  remove(row){
             this.my_cartProduct.splice(row,1);
  }
  quantity(q,row){
    var quantity=q;
    var q_amount=this.my_cartProduct[row].amount;
    var amount=q_amount*quantity;
    (document.querySelector('#am'+row) as HTMLInputElement).value=String(amount);
    //sum of total amount..when quantity will incress
    this.dum_cart[row].amount=amount;
    this.total = this.dum_cart.reduce((sum, item) => sum + item.amount, 0);
  }
 

}
