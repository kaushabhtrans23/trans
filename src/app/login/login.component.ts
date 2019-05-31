import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { appUsersAuth } from '../security/app-users-auth';
import { User } from '../model/user';
import { cacheMemory } from '../model/constant';
import { DataService } from '../service/data.service';
import { LoginSecurityService } from '../service/login-security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {Location} from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{

  private retryCounter: number = 0;
  user: User = new User();
  securityObject: appUsersAuth =null;
  returnUrl: string;
  commonUrl: string;
  passwordReset:boolean=false;
  constructor(
    
  
    private dataService: DataService, private loginservice: LoginSecurityService,
    private route: ActivatedRoute, private router: Router, private location: Location, private userservice: UserService) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    
    
    this.dataService.currentUser.subscribe(user => this.user = user);
  }
  
  
 ngOnDestroy()
  {

 }
  login() {

    this.loginservice.login(this.user).subscribe(resp => {
this.user=resp;
if(this.user==undefined)
this.user=new User();

this.dataService.updateUser(this.user);

this.securityObject=this.loginservice.securityObject;

      if (this.securityObject.isAuthinticated) {
        
        cacheMemory.set("loginId", this.user.userEmail);
        cacheMemory.set(<string>cacheMemory.get("loginId"),this.user);
       // this.getUser(this.securityObject.userName);
      }
      if (this.returnUrl) {
if(this.returnUrl.includes("admin") && !this.securityObject.isRoleAdmin){
  this.router.navigateByUrl("/home");
}else
        this.router.navigateByUrl(this.returnUrl);

      }
      else if (this.securityObject.isAuthinticated) {
     
        if(this.securityObject.isRoleAdmin){
          this.router.navigateByUrl("/admin");
        }else{
        
     //this.location.back();
     this.router.navigateByUrl("/home");
        }
      }
    },err=>{this.user=new User();
  
      this.dataService.updateUser(this.user);
     
    });

  }
  instantiateSecurityObject(data:User){
    this.securityObject=new appUsersAuth();
    this.securityObject.bearerToken=data.token;
    this.securityObject.userName=data.userName;
    this.securityObject.isAuthinticated=true;
    this.securityObject.canViewVehicle=true;
 this.securityObject.canViewRide=true;
 this.securityObject.canViewWallet=true;
this.securityObject.canViewSettings=true;
if(data.role==="ADMIN")
this.securityObject.isRoleAdmin=true;
  }

  resetPassword(){
    this.passwordReset=true;


  }
  getNewPassword(phone:string){
    this.passwordReset=false;
  this.loginservice.resetPassword(+phone).subscribe(
    resp=>{console.log(resp)},
    error=>{console.log(error)}
  );
  }
}
