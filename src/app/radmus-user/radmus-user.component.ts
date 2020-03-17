import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AppServiceService} from '../app-service.service';


@Component({
  selector: 'app-radmus-user',
  templateUrl: './radmus-user.component.html',
  styleUrls: ['./radmus-user.component.css']
})
export class RadmusUserComponent implements OnInit {

  add_users: FormGroup;
  data:any;
  deleteUser: any;
  addUser: any;
  insertbtn=true;
  updatebtn=false;
  constructor(private fb : FormBuilder ,private _appService: AppServiceService) { }

  

  ngOnInit() 
  {
    this.add_users= this.fb.group({
      id :[''],
      username :['',[Validators.required]],
      email :['',[Validators.required]],
      phone :['',[Validators.required]],
      password :['',[Validators.required]],
      role :['',[Validators.required]]
    });

    this._appService.get_userinfo().subscribe(
      (results)=>{ 
        this.data=results; 
    });
  }

  delete(id:any)
  {
    this._appService.get_userinfoDelete(id).subscribe( (data) =>
    {
      this.deleteUser= data;
      this. ngOnInit();
    })
  }
  
  onSubmit()
  {

    this._appService.get_userinfoAdd(this.add_users.value).subscribe( (data) =>
    {
      this.addUser= data;
      this. ngOnInit();
    })
  }
  editUsers(id){
    this.insertbtn=false;
    this.updatebtn=true;
    console.log(this.data[id])
    this.add_users.patchValue(this.data[id]);
  }
  onUpdate(id)
  {
    this.insertbtn=true;
    this.updatebtn=false;
    this._appService.userinfoUpdate(this.add_users.value,id).subscribe( (data) =>
    {
      this.addUser= data;
      this. ngOnInit();
    })
  }
}
