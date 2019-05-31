import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../model/booking';
import { CANCELED, ONGOING, COMPLETE } from '../model/constant';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-bookingchild',
  templateUrl: './bookingchild.component.html',
  styleUrls: ['./bookingchild.component.css']
})
export class BookingchildComponent implements OnInit {

  @Input() km:string;
  @Input() userId:string;
  @Input() booking:Booking;
  @Output() fare:EventEmitter<boolean> = new EventEmitter<boolean>();
  endride:boolean=false;
  constructor(private service:BookingService) { }

  ngOnInit() {
  }

  viewFare(s:string){
    if(s==='F')
    this.fare.emit(true);
    else if(s==='R')
    this.fare.emit(false);

  }
  endTrip(booking:Booking)
  {
    booking.status=COMPLETE;
    this.endride=false;
    this.service.cancelRide(booking).subscribe(resp=>console.log(resp),
    error=>console.log(error));

  }
  startTrip(booking:Booking){

booking.status=ONGOING;
this.endride=true;
this.service.cancelRide(booking).subscribe(resp=>console.log(resp),
error=>console.log(error));
  }
hello(){
 this.booking.bookingDate;
 this.booking.fare.estimatedFare;
 this.booking. id;
 
}
cancelRide(booking:Booking){
    
  if(confirm("Are you sure to Cancel this booking")) {
    booking.canCancle=false;
    booking.status=CANCELED;
    
    this.service.cancelRide(booking).subscribe(resp=>console.log(resp),
    err=>console.log(err)
    );
  }
}
}
