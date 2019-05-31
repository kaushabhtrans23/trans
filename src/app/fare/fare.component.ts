import { Component, OnInit, Input, OnChanges, SimpleChanges, Output ,EventEmitter} from '@angular/core';
import { Booking } from '../model/booking';
import { Ride } from '../model/ride';
import { DRIVER_PER_DAY_Allowance, MINI, SEDAN, SUV, TRAVELLER, EXTRA_ADDED_KM, BOOKED } from '../model/constant';
import { Vehicle } from '../model/vehicle';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { BookingService } from '../service/booking.service';
import { DataService } from '../service/data.service';
import { User } from '../model/user';


@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent implements OnInit ,OnChanges{
  @Input() km:string;
  @Input() userId:string;
  @Input() booking:Booking;
  @Input() rateperkm:number;
  @Input() numberOfDays:number;
  @Output() bookingChange:EventEmitter<Booking> = new EventEmitter<Booking>();
 
 
   baseFare:number;
   kmProvided:number;
   estimatedFare:number;
   totalAllowance:number;
   TolatTax:number;
   user:User;
   allowanceperday:number=DRIVER_PER_DAY_Allowance;
  constructor(private router:Router,private bookingservice:BookingService,private dataservice:DataService) {
    
 }

  ngOnInit() {
   alert(this.numberOfDays);
   alert(this.km);
   alert(this.rateperkm);
   
   
    // this.calculatFare(this.booking);
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  
    if (changes['booking'] || changes['km']) {
     
      
      // this.calculatFare(this.booking);
  }
//   if (changes['userId']) {
     
      
//     this.bookRide();
// }



  }
  bookRide()
  {
    
    if(this.userId.trim().length!=0)
    {
   this.booking.roundTrip
this.booking.bookingDate=new Date().toJSON();
this.booking.status=BOOKED;
this.booking.canCancle=true;

this.bookingservice.bookRide(this.booking,this.userId).subscribe(resp=>{this.booking=resp;
  
  
  this.bookingChange.emit(this.booking);},
  error=>console.log(error));
    }
    else{
    
this.router.navigateByUrl("/login");


this.bookingservice.bookRide(this.booking,this.userId).subscribe(resp=>{this.booking=resp
  this.bookingChange.emit(this.booking);
},
  error=>console.log(error));
    }
  }
  // calculatFare(booking:Booking)
  // {
  //   this.claNoDays(booking.ride);
  //   this.kmProvided=(+(<number>booking.fare.totalKM)+ +EXTRA_ADDED_KM);
  //   if(+booking.fare.totalKM<=110 && +this.numberOfDays==1)
  //  {
     
  //    this.kmProvided=+(<number>booking.fare.totalKM);
  //    this.numberOfDays=0;
  
  //  }
  
   
    
   
//     this.ratePerKm=this.calRatePerKm(this.booking.vehicle);
//     this.baseFare=this.kmProvided*this.ratePerKm;
//     this.estimatedFare=this.baseFare+this.TolatTax;
    
//     this.totalAllowance=+this.numberOfDays*+DRIVER_PER_DAY_Allowance;
//     this.TolatTax=this.totalAllowance;
   
// this.populatefare();

//   }

//   claNoDays(ride:Ride){
// var endDay=new Date(ride.enddate);
// var startDay=new Date(ride.startdate);
// var timeDiff = Math.abs(+endDay.getTime() - +startDay.getTime());
// var diffDays = Math.ceil(+timeDiff / (1000 * 3600 * 24))
// console.log("END DAY"+endDay);
// console.log("START DAY"+startDay);
// console.log("TIme difference"+timeDiff);
// console.log("DIFFERENCE DAY"+diffDays);

// this.numberOfDays=diffDays;
// console.log("no of day"+this.numberOfDays);
// // if(this.numberOfDays==0)
// // {
// //   this.numberOfDays=1;
// // }

//   }
//   calRatePerKm(vehicle:Vehicle):number{
//     if(vehicle.category==='MINI')
//     {
//       return MINI;
//     }
//     else if(vehicle.category==='SEDAN')
//     {
//       return SEDAN;
//     }
//     else if(vehicle.category==='SUV')
//     {
//       return SUV;
//     }
//     else if(vehicle.category==='TRAVELLER')
//     {
   
//       return TRAVELLER;
//     }
  
//   }
//   populatefare(){
//     this.booking.fare.estimatedFare=<LongRange>this.estimatedFare;
//     this.booking.fare.driverAllowance=<LongRange>this.totalAllowance;
//     this.booking.fare.extraKmFee=<LongRange>this.ratePerKm;
//     this.booking.fare.totalFare=<LongRange>this.estimatedFare;
//     this.booking.fare.totalKMTravelled=<LongRange>this.kmProvided;

//   }
}
