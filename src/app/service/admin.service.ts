import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private getAllBookingUrl = "/api/booking/getAllBooking";
  private getAllVehicleUrl = "/api/ride/getAllVehicle";
  private addVehicleUrl="/api/ride/addVehicle";
  private confirmBookingUrl="/api/booking/confirmRide";
  constructor(private http:HttpClient) { }
  getAllBooking():Observable<Booking[]>
  {
  return this.http.get<Booking[]>(this.getAllBookingUrl).pipe(
    tap(data => console.log(data),
  error =>  console.log(error)))
  }
  getAllVehicle():Observable<Vehicle[]>
  {
    return this.http.get<Vehicle[]>(this.getAllVehicleUrl).pipe(
      tap(data => console.log(data),
    error =>  console.log(error)))
    }
  
  addVehicle(vehicle:Vehicle):Observable<Vehicle>{
   
    return this.http.post<Vehicle>(this.addVehicleUrl, vehicle, httpOptions).pipe(
      tap(data => console.log(data),
      error =>  console.log(error)))
  }
  confirmBooking(booking:Booking){
    
    return this.http.post<Vehicle>(this.confirmBookingUrl,booking, httpOptions).pipe(
      tap(data => console.log(data),
      error =>  console.log(error)))
  }

}
