import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpResponse, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // modify request

    request = request.clone({
      // url:"http://ec2-13-234-137-7.ap-south-1.compute.amazonaws.com:8080"+request.url,
     url:"http://localhost:8080"+request.url,
    });
  

    if(!request.url.includes('/api/users/sign-up') && !request.url.includes('/api/booking/fareDetails/') && !request.url.includes('password') 
  && !request.url.includes('/api/pnm/saveDetails') ){
     
    request = request.clone({
      
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("bearerToken")}`
      }
 
    });
   
  }
  
    return next.handle(request)
    .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const config = new MatSnackBarConfig();
          
            console.log(" all looks good");
            // http response status codey

            console.log(event.status);
            console.log(event.body);
            console.log(event.headers);
            
            if(request.url.includes('login') && event.status==200)
            this.snackBar.open("YOU ARE SUCCESSFULLY LOGGEDIN", "OK", {
              duration: 7000,
            });
            if(request.url.includes('fareDetails') && event.status==200)
            this.snackBar.open("FARE IS GENERATED", "OK", {
              duration: 7000,
            });
            if(request.url.includes('cancleRide') && event.status==200)
            this.snackBar.open("RIDE IS CANCELED", "OK", {
              duration: 7000,
            });
            
            if(request.url.includes('/book/') && event.status==200)
            this.snackBar.open("RIDE IS BOOKED PLEASE VISIT MY BOOKING FOR MORE DETAILS", "OK", {
              duration: 7000,
            });
            
            if(request.url.includes('addVehicle') && event.status==200)
            this.snackBar.open("VEHICLE IS ADDED", "OK", {
              duration: 7000,
            });
            if(request.url.includes('getAllVehicle') && event.status==200)
            this.snackBar.open("VIEW LIST OF VEHICLE", "OK", {
              duration: 7000,
            });
            

          }
        }, error => {
         // http response status code
        
         if(request.url.includes('login') && error.status==403)
         this.snackBar.open("WRONG USER OR PASSWORD", "OK", {
           duration: 7000,
         });
         else
         this.snackBar.open("OOPS SOMETHING WENT WRONG", "OK", {
          duration: 7000,
        });
            console.log("----response----");
            console.error("status code:");
            console.error(error.status);
            console.error(error.headers);
            console.error(error.body);
         
            console.log("--- end of response---");
         
        })
      )
     
  };

}
