import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: 'admin';
  constructor(private route: Router) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", this.users)
  }
 
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    this.route.navigate(["login"]);
  }
}
