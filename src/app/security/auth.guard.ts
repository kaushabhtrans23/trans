
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSecurityService } from '../service/login-security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityService:LoginSecurityService,private route:Router){
  
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let claimType:string=next.data["claimType"];
  if(this.securityService.securityObject.isAuthinticated 
      && this.securityService.securityObject[claimType]){
    return true;
  }else
    {
    this.route.navigate(['login'],{queryParams:{returnUrl:state.url}});
  }
  return false;
  }
  }

