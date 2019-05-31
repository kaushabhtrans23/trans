import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private getfaredetailsUrl = "/api/booking/fareDetails/";
  private getBookingUrl = "/api/booking/book/";
  private getCancleBookingUl="/api/booking/cancleRide";
  constructor(private http:HttpClient) { }

  public fetchFare(booking: Booking,userID:string): Observable<Booking> {

    return this.http.post<Booking>(this.getfaredetailsUrl+"userI", booking, httpOptions).pipe(
      tap(data => console.log(data),
      error =>  console.log(error)))
      
  }
  public bookRide(booking: Booking,userID:string):Observable<Booking>{
return this.http.post<Booking>(this.getBookingUrl+userID,booking,httpOptions).pipe(
  tap(data=>console.log(data)
 
  ,
  error=>console.log(error)
  )
);

  }
  cancelRide(booking:Booking):Observable<Booking>{
   
return this.http.post<Booking>(this.getCancleBookingUl,booking,httpOptions).pipe(
  tap(data=>console.log(data),
  error=>console.log(error)
));
  }

}
