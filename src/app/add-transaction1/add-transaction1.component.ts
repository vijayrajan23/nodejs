import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {FormGroup,FormControl,Validators } from '@angular/forms';
import {AppServiceService} from '../app-service.service';

@Component({
  selector: 'app-add-transaction1',
  templateUrl: './add-transaction1.component.html',
  styleUrls: ['./add-transaction1.component.css']
})
export class AddTransaction1Component implements OnInit {
  mytestform : FormGroup
  htmlStr:string;
  skils_value:string;
  groupList:any = [];
  constructor(
    //private fb:FormBuilder
    private renderER : Renderer2,
    private _appservice : AppServiceService

    ) { }
    
    
  ngOnInit() {
    // this.mytestform=this.fb.group({
    //   fname:[''],
    // })
    this.mytestform =new FormGroup({
      uname:new FormControl(''),
      password:new FormControl(''),
      cpassword:new FormControl(''),
      email:new FormControl(''),
      Mobile:new FormControl(''),
      gender:new FormControl(''),
      address:new FormControl(''),
      skils: new FormControl(''), 
      date_of_birth:new FormControl('')
      
      // rid:new FormControl('',Validators.required),
      // cid:new FormControl('',Validators.required),
      // sid:new FormControl('',Validators.required),
      // shopname:new FormControl('',Validators.required),
      // amount:new FormControl('',Validators.required),
      // pickupType:new FormControl('',Validators.required),
      // remarks:new FormControl('',Validators.required),
      // shop_type: new FormControl('',Validators.required)
     
    })

  }

  @ViewChild('skils', {static: false}) pRef: ElementRef;

  skilss(){
    if(this.pRef.nativeElement.value!=''){
          this.groupList.push({sklis:this.pRef.nativeElement.value});
          this.array_object_to_string();
    }
          this.pRef.nativeElement.value=''
  }
  remove_skils(id){
          this.groupList.splice(id,1);
          this.array_object_to_string();
  }

  array_object_to_string(){
     ///convert array of json object to string (ex:[{},{}]---to--1,2)
      var jk= this.groupList.map(function(obj){
        return obj.sklis;
      }); 
      this.skils_value=jk.toString();
      // <!--- skils value patch to form -->
      this.mytestform.patchValue({
         skils: this.skils_value
      })
  }
  onSubmit(){
    console.log(this.mytestform.value)
            this._appservice.add_user_cart(this.mytestform.value).subscribe(
              (data)=>{console.log(data)} 
            );
  }

}
