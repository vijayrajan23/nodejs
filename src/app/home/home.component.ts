import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServiceService } from '../app-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ipAddress:any;
  constructor( private HttpClient : HttpClient,private apservice:AppServiceService) { }

  ngOnInit() {
    this.getIPAddress();
}
getIPAddress()
{
  this.HttpClient.get("http://api.ipify.org/?format=json").subscribe(
    (res:any)=>{
    this.ipAddress = res.ip;
    this.apservice.find_ip(this.ipAddress).subscribe(
      (data) =>{
        console.log(data['country']);
        localStorage.setItem('country',data['country'])
      }

    )
  });
}

}
