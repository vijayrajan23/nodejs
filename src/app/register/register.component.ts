import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false ;

  EmployeeProfile:any = ['Admin', 'User', 'Client'];
  constructor(private fb: FormBuilder,private location: Location,
    private route: Router,private appsrvice : AppServiceService) {
    this.registerForm =this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['',[Validators.required]],
      mobile: ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      dob: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      
    });

    route.events.subscribe((val) => {
      if(location.path() == '/register'){
       document.body.style.backgroundColor='#032c42';
      } else {
        document.body.style.backgroundColor='';
      }
    });

   }

  ngOnInit() {
  }
  
  get myForm(){
    return this.registerForm.controls;
      }
    
     onSubmit()
     {
    console.log(this.registerForm.value)
    this.submitted = true;
    
    if(this.registerForm.invalid) {
     return ;
    }else
    {
     this.appsrvice.register_form(this.registerForm.value).subscribe(
    (data) => {
     this.route.navigate(["/home"]);
    },
    (error) => {
     this.route.navigate(["/login"]);
    }
      )
    }
     }
}
