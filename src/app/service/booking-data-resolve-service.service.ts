import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BookingDataResolveServiceService implements Resolve<Booking>{
   booking:Booking;
  observable:Observable<Booking>;
  constructor(private userService:UserService,private dataService:DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Booking | Observable<Booking> | Promise<Booking> {
    this.observable= this.dataService.currentBooking;
    return this.observable;
  }
}
