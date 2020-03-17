import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser :any;
  loggedUserRole: any;

  constructor(private auth : AuthService, router: Router) { }

  ngOnInit() {
    this.loggedUser = localStorage.getItem("LoggedInUser");
    this.loggedUserRole = localStorage.getItem("LoggedInRole");
   
  }
  logout(){
    this.auth.logout();
  }

}
