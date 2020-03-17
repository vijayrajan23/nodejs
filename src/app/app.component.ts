import { Component } from '@angular/core';
import { Router,NavigationStart  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isCollapsed = false;
  showHead: boolean = false;
  showfooter: boolean = false;
  title = 'radmus';
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/' || event['url'] == '/register') {
            this.showHead = false;
            this.showfooter = true;
          } else {
            // console.log("NU")
            this.showHead = true;
            this.showfooter = false;

          }
        }
      });
    }
    ngOnInit() {
    }
}
