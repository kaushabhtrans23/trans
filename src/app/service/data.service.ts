import { User } from '../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private booking=new BehaviorSubject(new Booking());
  private user = new BehaviorSubject(new User());
  currentUser=this.user.asObservable();
  currentBooking=this.booking.asObservable();
  constructor() { }
  
  
  
  updateUser(user:User)
  {

  this.user.next(user);
    
  }

  updatebooking(booking:Booking)
  {
 
  this.booking.next(booking);
    
  }
}
