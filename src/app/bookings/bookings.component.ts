import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { Ride } from '../model/ride';
import { Booking } from '../model/booking';
import { BookingService } from '../service/booking.service';
import { CANCELED } from '../model/constant';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  panelOpenState=false;
  state:boolean=false;
  private user:User=null;
  
    public bookinglist:Booking[];
  constructor(private dataService:DataService,private route:ActivatedRoute,private service:BookingService) { }

  ngOnInit() {
   //this.route.data.subscribe((data: { user: User })=>{this.user=data.user})
   //this.dataService.updateUser(this.user);

        this.dataService.currentUser.subscribe(resp => {this.user = resp
         });
        

    if((this.user).allbooking.length>0){
     this.bookinglist=this.user.allbooking;
   
    }
    else{
   this. bookinglist=[];
    }
 
  }
  open(booking:Booking){

    
    this.state=false;
  if(booking.select==false){
   
  booking.select=true;
}
  else{
  booking.select=false;}

}
openfare(event :any)
{
this.state=true;
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
