import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router,ActivatedRoute, NavigationStart  } from '@angular/router';
import { Location } from '@angular/common';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  registerForm: FormGroup;
  submitted= false;
  site_url;

  loginUser: any;
  rec: any;
  error: any;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private router: ActivatedRoute,
    private elementRef: ElementRef,
    private location: Location,private apiService :AppServiceService) {

      
  
    this.registerForm =this.fb.group({
      username:['',[Validators.required]], 
      password:['',[Validators.required]]
    });
    
    route.events.subscribe((val) => {
      if(location.path() == '/login' || location.path() == ''){
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

   login() {
    this.submitted=true;
     this.apiService.get_loginUser(this.registerForm.value).subscribe(
       (records)=>{
         this.rec =records;

       if(records[0].error)
       {
         this.error = records[0].error;
       }else{
       
         if(this.rec[0].role == 'client')
         {
           alert() 
           console.log(this.rec[0].username)
           localStorage.setItem("LoggedInUser",this.rec[0].username);
           localStorage.setItem("LoggedInRole",this.rec[0].role);
           this.route.navigate(["/clientview"]);
         }else{
         localStorage.setItem("LoggedInUser",this.rec[0].username);
         localStorage.setItem("LoggedInRole",this.rec[0].role);
         this.route.navigate(["/home"]);
         }
       }
        
       }
       );
    
       
 }
}
