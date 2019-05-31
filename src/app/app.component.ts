import { Component, OnInit } from '@angular/core';
import { LoginSecurityService } from './service/login-security.service';
import { DataService } from './service/data.service';
import { cacheMemory } from './model/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {

    document.body.style.zoom = "75%";
  }
  title = 'app';
  constructor(private loginservice:LoginSecurityService,private dataservice:DataService){
if(localStorage.getItem("securityObject")!=null&& localStorage.getItem("user")!=null)
{

  loginservice.securityObject=JSON.parse(localStorage.getItem("securityObject"));
  dataservice.updateUser(JSON.parse(localStorage.getItem("user")));
  
  cacheMemory.set("loginId", (JSON.parse(localStorage.getItem("user"))).userEmail);
  cacheMemory.set(<string>cacheMemory.get("loginId"),(JSON.parse(localStorage.getItem("user"))));
}
  }
}
