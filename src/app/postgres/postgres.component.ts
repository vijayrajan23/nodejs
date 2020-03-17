import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-postgres',
  templateUrl: './postgres.component.html',
  styleUrls: ['./postgres.component.css']
})
export class PostgresComponent implements OnInit {
addShop : FormGroup;
 customer: Object;
 submitted = false;
 results: any;
 pan_location:any
 data: any;
 state:any;
 sub_btn=true;
 update_btn=false;
 showInsert= false;
 showUpdate= false;
 showDelete= false;
 cars: any[];
 cols: any[];
 constructor(private fb : FormBuilder,private _appService: AppServiceService) { }
        ngOnInit() {

		 this._appService.get_pan_loaction().subscribe(
        (data) => {this.data=data
        console.log(this.data=data);
        }, 
        (error) => {}
       	 )
    this._appService.get_pan_state().subscribe(
        (data) => {
            this.state=data;
            console.log(this.state);
        }
    )
	
	}
 state_filter(event){
       
        this._appService.state_filter(event.target.value).subscribe(
            (data) => {
                this.data=data;
  console.log(this.data);

            }
        )
    }
}
