import { Component, OnInit } from '@angular/core';
import { LoginSecurityService } from '../service/login-security.service';
import { appUsersAuth } from '../security/app-users-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  securityObject: appUsersAuth = null;
  constructor(private securityService: LoginSecurityService, private route: Router) {
    

    this.securityObject = this.securityService.securityObject;
   }

  ngOnInit() {
  }
  closeNav() {
   
      document.getElementById("mySidenav").style.width = "0";
      // document.getElementById("main").style.marginLeft= "0";
      document.body.style.backgroundColor = "white";
    }
    logout(): void {

      this.securityService.logout();
     
      this.route.navigateByUrl("/home");
      
    }

}
