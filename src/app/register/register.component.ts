import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { User } from '../model/user';
import { LoginSecurityService } from '../service/login-security.service';
import { state } from '@angular/animations';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { cacheMemory } from '../model/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private dataservice:DataService, private registerService: RegistrationService,private router:Router,private loginservice:LoginSecurityService) {}

  public user: User = new User();
 
  userRegistration(): void {
  
    this.registerService.registerUser(this.user).subscribe(resp =>{"passsssss"+console.log(resp)
   
    if(resp==undefined)
    this.user=new User();
    else
  this.user=resp;
  }
  ,err=>{console.log(err)});
}



}