import { Component, OnInit } from '@angular/core';
import { LoginSecurityService } from '../service/login-security.service';
import { appUsersAuth } from '../security/app-users-auth';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  securityObject: appUsersAuth = null;
  constructor(private securityService: LoginSecurityService, private route: Router) {


    this.securityObject = this.securityService.securityObject;
  }

  ngOnInit() {
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  logout(): void {

    this.securityService.logout();
   
    this.route.navigateByUrl("/home");
    
  }
  login(): void {

    this.route.navigate(['login']);
  }


}
