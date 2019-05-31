import {User} from '../model/user';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import { cacheMemory } from '../model/constant';
import { Router } from '@angular/router';
import { LoginSecurityService } from './login-security.service';
import { DataService } from './data.service';
import { MatSnackBar } from '@angular/material';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registrationUrl = "/api/users/sign-up";

  constructor(private snackBar: MatSnackBar,private dataservice:DataService,private http: HttpClient,private router:Router,private loginservice:LoginSecurityService) {

  }


user=new User();
  public registerUser(user: User): Observable<User> {

    return this.http.post<User>(this.registrationUrl, user, httpOptions).pipe(
      tap(data => {console.log("hello register"+JSON.stringify(data))
     
            this.snackBar.open("YOU ARE SUCCESSFULLY REGISTRED", "OK", {
              duration: 7000,
            });
      user.userName=<string>user.userPhoneNumber;
      this.loginservice.login(user).subscribe(resp => {
        this.user=resp;
this.dataservice.updateUser(this.user);
        cacheMemory.set("loginId", this.user.userEmail);
            cacheMemory.set(<string>cacheMemory.get("loginId"),this.user);
    
        this.router.navigateByUrl("/home");
      
       
       
      }
        , err=>{"falillllllly"+console.log(err)});},
      error =>  {console.log(error)
      this.user=new User();
      this.dataservice.updateUser(this.user);
      this.snackBar.open("EMAIL OR PHONE NUMBER ALREADY REGISTRED", "OK", {
        duration: 7000,
      });
      }),
      catchError(this.handleError<User>("registration")));
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

}
