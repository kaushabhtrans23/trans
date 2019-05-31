import { cacheMemory } from '../model/constant';
import { User } from '../model/user';

import { appUsersAuth } from '../security/app-users-auth';

import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Booking } from '../model/booking';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST'})
};
@Injectable({
  providedIn: 'root'
})
export class LoginSecurityService {
  securityObject: appUsersAuth = new appUsersAuth;
  constructor(private dataService: DataService, private http: HttpClient,private snackBar: MatSnackBar) { }

 resetPasswordUrl="http://control.msg91.com/api/sendotp.php";
 authKey="?authkey=238698AlJRwqSR5ba3b5fb";
 message="&message=Hi,%20your%20new%20password%20is%20%23%23OTP%23%23";
 sender="&sender=TRNS23";
 mobile="&mobile=";
 resetPassword(phone:number):Observable<String>{
 
  return this.http.post<String>("/api/users/resetpassword",phone,httpOptions).pipe(
    
    tap(data=>{
      alert("data");
      console.log(data);
    },
    error=>{
      alert(this.resetPasswordUrl+this.authKey+this.message+this.sender+this.mobile+phone);
      alert("error");
      console.error(error.status);
            console.error(error.headers);
            console.error(error.body);})
  )
  }
  public login(user: User): Observable<User> {
    this.resetSecurityObject();
  
    this.dataService.updateUser(new User());
   
    if (cacheMemory.get("loginId") != null)
      cacheMemory.set(<string>cacheMemory.get("loginId"), null);
    cacheMemory.set("loginId", null);//to be put in method
    cacheMemory.set("userDetails", null);//to be put in method

    return this.http.post<User>("/login", user, httpOptions).pipe(
      tap(data => {
        
        this.instantiateSecurityObject(data);
      
        this.dataService.updateUser(data);
        localStorage.setItem("user",JSON.stringify(data));
      
       
      },
        error => {console.log(error)
        this.sneekBar("USER OR PASSWORD IS WRONG");
        this.dataService.updateUser(new User());
        }),
      catchError(this.handleError<User>("login")));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //  this.log(`${operation} failed: ${error.messag}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout(): void {

    this.dataService.updateUser(new User());
    this.dataService.updatebooking(new Booking());
    this.resetSecurityObject();
    this.sneekBar("LOGGED OUT..");
   
    cacheMemory.set(<string>cacheMemory.get("loginId"), null);
    cacheMemory.set("loginId", null);//to be put in method
    cacheMemory.set("userDetails", null);//to be put in method

  }
  sneekBar(msg:string){
    this.snackBar.open(msg, "OK", {
      duration: 7000,
    });
  }

  resetSecurityObject(): void {
    this.securityObject.isRoleAdmin=false;
    this.securityObject.bearerToken = "";
    this.securityObject.userName = "";
    this.securityObject.isAuthinticated = false;
    this.securityObject.canViewVehicle = false;
    this.securityObject.canViewRide = false;
    this.securityObject.canViewWallet = false;
    this.securityObject.canViewSettings = false;
    localStorage.setItem("bearerToken", "");
    
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("securityObject");
    localStorage.removeItem("user");

  }
  instantiateSecurityObject(data: User) {
    this.dataService.updateUser(data);
    this.securityObject.bearerToken = data.token;
    this.securityObject.userName = data.userName;
    this.securityObject.isAuthinticated = true;
    this.securityObject.canViewVehicle = true;
    this.securityObject.canViewRide = true;
    this.securityObject.canViewWallet = true;
    this.securityObject.canViewSettings = true;
    
    
    if(data.role=="ADMIN")
    {
      this.securityObject.isRoleAdmin=true;
    }
    localStorage.setItem("bearerToken", this.securityObject.bearerToken);
    localStorage.setItem("securityObject",JSON.stringify(this.securityObject));
  }

 
}
