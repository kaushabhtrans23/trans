import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { Booking } from '../model/booking';
import { AdminService } from '../service/admin.service';
import { CONFIRM } from '../model/constant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  vehiclelist:Vehicle[];
  public bookinglist:Booking[];
  vehicle:Vehicle=new Vehicle();
  
  vehicleReg:string;
  bookingId:string;
  constructor(private adminservice:AdminService) { }

  ngOnInit() {
    this.getAllBooking();
   this. getAllVehicle()
  }
getAllBooking()
{
this.adminservice.getAllBooking().subscribe(resp=>this.bookinglist=resp,
  err=>console.log(err));
}
getAllVehicle()
{
this.adminservice.getAllVehicle().subscribe(resp=>this.vehiclelist=resp,
  error=>console.log(error));
}
addVehicle(vehicle:Vehicle){
  
  this.adminservice.addVehicle(vehicle).subscribe(resp=>{console.log(resp)
  this.vehiclelist.push(vehicle)},
  err=>console.log(err))

}
confirmBooking(vehicle:Vehicle){
  this.bookinglist.forEach((booking,index)=>{
    if(booking.id===this.bookingId)
    {booking.vehicle=vehicle;
     booking.confirmed=true;
     booking.status=CONFIRM;
     booking.canCancle=false;
     booking.confirmDate=new Date().toJSON();
     this.adminservice.confirmBooking(booking).subscribe(resp=>{console.log(resp)
 
     },
     err=>console.log(err));
   } 
     });
 

}
editConfirm(booking:Booking){
booking.confirmed=false;
}
}
