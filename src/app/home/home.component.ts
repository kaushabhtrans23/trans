import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { User } from '../model/user';
import { Booking } from '../model/booking';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LocationAddress } from '../model/locationAddress';
import { FormControl } from '@angular/forms';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { calendarFormat } from 'moment';
import { BookingService } from '../service/booking.service';
import { allSettled } from 'q';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {} from 'googlemaps';

import { AgmMap, MapsAPILoader, LatLng } from '@agm/core';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { FARE, MINI, SEDAN, SUV, TRAVELLER, DRIVER_PER_DAY_Allowance, EXTRA_ADDED_KM, BOOKED } from '../model/constant';
import { Vehicle } from '../model/vehicle';
import { Ride } from '../model/ride';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 
})
export class HomeComponent implements OnInit {
  pnmiconarr:string[]=["/assets/img/icon/pnm1.png","/assets/img/icon/pnm2.png",
  "/assets/img/icon/pnm3.png","/assets/img/icon/pnm4.png"];
  pnmicon:string=this.pnmiconarr[0];
  cabiconarr:string[]=["/assets/img/icon/cab1.png","/assets/img/icon/cab2.png",
  "/assets/img/icon/cab3.png","/assets/img/icon/cab4.png"];
  cabicon:string=this.pnmiconarr[0];
Posterhidden:boolean;
homeHidden:boolean;
pncHidden:boolean;
user:User;
Booking:Booking=new Booking();
selectedDate:Date[]=[ new Date(), new Date()];
model: NgbDateStruct;
directionsService;
km;
popup;
dir:boolean=true;
today = this.calendar.getToday();
public min = new Date();
public minend=new Date();
dateString:string=" ";
fareDetails:boolean;
rideDetails:boolean;
booked:boolean=false;
 from:string;
to:string;
kilometre:string;
time:string;
//fare
numberOfDays: number;
   ratePerKm:number;
   baseFare:number;
   kmProvided:number;
   estimatedFare:number;
   totalAllowance:number;
   TolatTax:number;
   suvPrice:number=0;
   miniPrice:number=0;
   travellerPrice:number=0;
   sedanPrice:number=0;
   issedanprice:boolean=false;
   isminiprice:boolean=false;
   issuvprice:boolean=false;
   istravellerprice:boolean=false;
   allowanceperday:number=DRIVER_PER_DAY_Allowance;
//fare
  constructor(private dataservice:DataService,private calendar: NgbCalendar,
    private modalService: NgbModal,private booking:BookingService,
    private mapsAPILoader: MapsAPILoader,private router:Router){}

  ngOnInit() {
    this.onTimeOut();
  console.log(this.selectedDate);
    this.fareDetails=false;
   this. rideDetails=false;
    this.dataservice.currentUser.subscribe(user=>{this.user=user
     });
   


     












    this.dataservice.currentBooking.subscribe(Booking=>this.Booking=Booking);
    
   
    this.After();

  }
   i=0;
  onTimeOut()
     {
     
       if(this.i==3)
       {
         this.i=0;
       }
       this.cabicon=this.cabiconarr[this.i];
       this.pnmicon=this.pnmiconarr[this.i];
       this.i++;
       setTimeout(() => 
       {
           this.onTimeOut();
       },
       3000);
        
        
     }
 hideContainer(desc:string){
if(desc==="PNC")
{
  this.Posterhidden=true;
  this.homeHidden=true;
  this.pncHidden=false;
}
else if(desc==="HOME")
{
  this.homeHidden=false;
  this.Posterhidden=true;
  this.pncHidden=true;
}
 }
 
  public handleAddressChange(address: Address, type:string) {
    // Do some stuff
    let locationAddress = new LocationAddress();
 
   
if(type==='start'){
      locationAddress.latitude = address.geometry.location.lat();
      locationAddress.longitude = address.geometry.location.lng();
      locationAddress.formattedAddress = address.formatted_address;
     // this.Booking.user.userRide=new Ride();

      this.Booking.ride.startRide=locationAddress;
    }
    else{
      locationAddress.latitude = address.geometry.location.lat();
      locationAddress.longitude = address.geometry.location.lng();
      locationAddress.formattedAddress = address.formatted_address;
      this.Booking.ride.endRide=locationAddress;
    }
if(this.Booking.ride.startRide.formattedAddress!=null && this.Booking.ride.endRide.formattedAddress!=null)
{
 console.log("inside ride after fare change"+JSON.stringify(this.Booking));
  this.calculateDistance();
  this.resetPrice();
 this.dir=false;
 setTimeout(() => 
{
    this.calculatFare(this.Booking);
    this.setTime();
},
600);
 
}   
}
setTime(){
  var   time = document.getElementById('time');
  alert(time);
  if(time.innerHTML.includes('day'))
  {
  var arr=time.innerHTML.split(' ');
  var startDay=new Date(this.Booking.ride.startdate);
  
  var day= (+arr[0])*86400000;
  var hour= (+arr[2])*3600000;
  alert(arr[0]);
  alert(arr[2]);
  var dateObj =Date.now();
dateObj = startDay.getTime()+day+hour;
this.selectedDate=[ new Date(), new Date(dateObj)];
this.minend= new Date(dateObj);
alert(dateObj);
  }
}

    resetHome()
    {
      this.booked=false;
  this.fareDetails=false;
  this.rideDetails=false;
    }
    viewfare(event :any){
      if(event===true){
      this.fareDetails=true;
      this.rideDetails=false;}
      else if(event===false){
        this.fareDetails=false;
      this.rideDetails=true;
      }
    }
rideBooked(event: any){

  if((<Booking>event).id.trim().length>0){
    this.Booking=((<Booking>event));
  this.booked=true;
  this.fareDetails=false;
  this.rideDetails=true;
  this.GetRideDetails();
  }
this.user.allbooking.push(event);
this.dataservice.updateUser(this.user);
}

    GetFareDetails(book:Booking)
    {
    this.Booking.bookingDate=new Date().toJSON();
    this.Booking.canCancle=true;
    this.Booking.status=FARE;
    
      console.log("select date"+this.selectedDate);
      this.dateString=this.selectedDate.toString();
      if(this.Booking.roundTrip==false){
        this.Booking.ride.startdate=(<string>this.dateString);
        this.Booking.ride.enddate=(<string>this.dateString);
      }else{
      this.Booking.ride.startdate=(<string>this.dateString).split(",")[0].trim();
      this.Booking.ride.enddate=(<string>this.dateString).split(",")[1].trim();


    }
      
           if(book.ride.startRide.formattedAddress!=null && book.ride.endRide.formattedAddress!=null)
    {
      this.km=<LongRange> document.getElementById('km').textContent;
      (book.roundTrip) ? this.km=this.km*2:this.km=this.km;
  
      this.Booking.fare.totalKM=this.km;
    //  this.Booking = Object.assign({}, this.Booking);//clone
      this.fareDetails=true;
      this.rideDetails=false;
      
      console.log("BOOKIG FOR FARE"+JSON.stringify(this.Booking));
  this.booking.fetchFare(book,this.user.userId).subscribe(resp => {
    this.Booking=resp; 
    this.fareDetails=true;
    this.rideDetails=false;
    // this.Booking.ride.startdate=new Date().toISOString();
    // this.Booking.ride.enddate=new Date().toISOString();
    this.dataservice.updatebooking(this.Booking); 
    this.dataservice.currentBooking.subscribe(Booking=>this.Booking=Booking);
  }
    , err=>{console.log(err)});

  }
  

else{
  alert("please select the place");
}
   
    }
    
    GetRideDetails()
    {
      if(this.Booking.ride.startRide.formattedAddress!=null || this.Booking.ride.endRide.formattedAddress!=null){
this.fareDetails=false;
this.rideDetails=true;

this.calcRoute();
      }
    }

//////maps///
After(){
this.mapsAPILoader.load().then((x) => {
 
  const bounds: LatLngBounds = new google.maps.LatLngBounds();
  
  
this.directionsService = new google.maps.DirectionsService();

   

 // this.directionsDisplay.setMap(this.map);
 
  
});
}
 calcRoute() {
  var polylineOptionsActual = {
    strokeColor: '#6A1B9A',
    strokeOpacity: 1.0,
    strokeWeight: 5
    }
   
this.calculateDistance();
  const directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual , suppressBicyclingLayer:true});

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    styles:[
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.attraction",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.government",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.medical",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.place_of_worship",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.school",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.sports_complex",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ],
    center: {lat: this.Booking.ride.startRide.latitude, lng: this.Booking.ride.startRide.longitude},
    disableDefaultUI:true
    
  });

  directionsDisplay.setMap(map);
 var or = new google.maps.LatLng(this.Booking.ride.startRide.latitude, this.Booking.ride.startRide.longitude);
  var des = new google.maps.LatLng(this.Booking.ride.endRide.latitude, this.Booking.ride.endRide.longitude);
  const request = {
    origin:or,
    destination: des,
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode['DRIVING']
};
var marker = new google.maps.Marker({
  position: or,
  map: map,
  title: 'Hello World!'
});
marker.setMap(map);
this.directionsService.route(request, function(response, status) {

    directionsDisplay.setDirections(response);
   


    var leg = response.routes[ 0 ].legs[ 0 ];
    makeMarker( leg.start_location,  "Start" );
    makeMarker( leg.end_location,  'End' );
   

  function makeMarker( position,title ) {
   new google.maps.Marker({
    position: position,
    map:map,
    title: title,
    draggable:true
   });
  }








  

});

 }
 calculateDistance(){

  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins:[{lat:this.Booking.ride.startRide.latitude, lng:this.Booking.ride.startRide.longitude}],
    destinations: [{lat:this.Booking.ride.endRide.latitude, lng:this.Booking.ride.endRide.longitude}],
    travelMode:  google.maps.TravelMode['DRIVING'],
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      var n= document.getElementById('km');
      outputDiv.innerHTML = '';
    
      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        
            
        for (var j = 0; j < results.length; j++) {
          var str=results[j].distance.text.replace('km' ,'').replace(',','').trim();
         this.km=results[j].distance.text.replace('km' ,'').replace(',','').trim();
         
         n.textContent=str;
       
         this.km=<LongRange> document.getElementById('km').textContent;
     
          // outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
          //     ': ' + results[j].distance.text + ' in ' +
          //     results[j].duration.text + '<br>';
          var   from = document.getElementById('from');
          var   to = document.getElementById('to');
          var   kilometre = document.getElementById('kilometre');
          var   time = document.getElementById('time');
          from.innerHTML="";
          to.innerHTML="";
          kilometre.innerHTML="";
          time.innerHTML="";
              from.innerHTML+=originList[i];
              to.innerHTML+=destinationList[j];
             kilometre.innerHTML+=results[j].distance.text;
              time.innerHTML+=results[j].duration.text;
           
        }
       
      }
      
  
 
}

);

 }



 isMini()
 {
   this.Booking.vehicle.category="MINI";
   this.ratePerKm=MINI;
 }
 isSedan()
 {
  this.Booking.vehicle.category="SEDAN";
  this.ratePerKm=SEDAN;
 }
 isSuv()
 {
   this.Booking.vehicle.category="SUV";
   this.ratePerKm=SUV;
 }
 isTraveller(){
this.Booking.vehicle.category="TRAVELLER"; 
this.ratePerKm=TRAVELLER;
}





//fare details..

calculatFare(booking:Booking)
  {
    this.dateString=this.selectedDate.toString();
    if(this.Booking.roundTrip==false){
      this.Booking.ride.startdate=(<string>this.dateString);
      this.Booking.ride.enddate=(<string>this.dateString);
    }else{
    this.Booking.ride.startdate=(<string>this.dateString).split(",")[0].trim();
    this.Booking.ride.enddate=(<string>this.dateString).split(",")[1].trim();
  
  }
 this.km=<LongRange>document.getElementById("km").textContent;
(this.Booking.roundTrip) ? this.km=this.km*2:this.km=this.km;
    this.claNoDays(booking.ride);
    this.kmProvided=(+(this.km)+ +EXTRA_ADDED_KM);
    
    if(this.km<=90 && +this.numberOfDays<=1)
   {
    
     this.kmProvided=+(this.km);
     this.numberOfDays=0;
  
   }
  
  
   this.totalAllowance=+this.numberOfDays*+DRIVER_PER_DAY_Allowance;
   this.TolatTax=this.totalAllowance;
   
    this.ratePerKm=this.calRatePerKm(this.Booking.vehicle);
    this.baseFare=this.kmProvided*this.ratePerKm;
    this.estimatedFare=this.baseFare+this.TolatTax;
    
  this.suvPrice=Math.round((this.kmProvided*SUV)+this.TolatTax);
  this.miniPrice=Math.round((this.kmProvided*MINI)+this.TolatTax);
  this.sedanPrice=Math.round((this.kmProvided*SEDAN)+this.TolatTax);
  this.travellerPrice=Math.round((this.kmProvided*TRAVELLER)+this.TolatTax);
   if(this.suvPrice!=0 && this.suvPrice!=NaN)
   {
this.issuvprice=true;
   }
   if(this.miniPrice!=0 && this.miniPrice!=NaN)
   {
this.isminiprice=true;
   }
   if(this.sedanPrice!=0 && this.sedanPrice!=NaN)
   {
this.issedanprice=true;
   }
   if(this.travellerPrice!=0 && this.travellerPrice!=NaN)
   {
this.istravellerprice=true;
   }
  
this.populatefare();

  }
resetPrice()
{
  this.travellerPrice=0;
  this.sedanPrice=0;
  this.suvPrice=0;
  this.miniPrice=0;
  this.isminiprice=false;
  this.issedanprice=false;
  this.istravellerprice=false;
  this.issuvprice=false;
}

  claNoDays(ride:Ride){
var endDay=new Date(ride.enddate);
var startDay=new Date(ride.startdate);
var timeDiff = Math.abs(+endDay.getTime() - +startDay.getTime());
var diffDays = Math.ceil(+timeDiff / (1000 * 3600 * 24))

var dateObj =Date.now();
dateObj += timeDiff;


console.log("END DAY"+endDay);
console.log("START DAY"+startDay);
console.log("TIme difference"+timeDiff);
console.log("DIFFERENCE DAY"+diffDays);

this.numberOfDays=diffDays;
console.log("no of day"+this.numberOfDays);
// if(this.numberOfDays==0)
// {
//   this.numberOfDays=1;
// }

  }
  calRatePerKm(vehicle:Vehicle):number{
    if(vehicle.category==='MINI')
    {
      return MINI;
    }
    else if(vehicle.category==='SEDAN')
    {
      return SEDAN;
    }
    else if(vehicle.category==='SUV')
    {
      return SUV;
    }
    else if(vehicle.category==='TRAVELLER')
    {
   
      return TRAVELLER;
    }
  
  }
  populatefare(){
    this.Booking.fare.estimatedFare=<LongRange>this.estimatedFare;
    this.Booking.fare.driverAllowance=<LongRange>this.totalAllowance;
    this.Booking.fare.extraKmFee=<LongRange>this.ratePerKm;
    this.Booking.fare.totalFare=<LongRange>this.estimatedFare;
    this.Booking.fare.totalKMTravelled=<LongRange>this.kmProvided;

  }

  //book ride
  bookRide()
  {
    
    if(this.Booking.id.trim().length!=0)
    {
   this.Booking.roundTrip
this.Booking.bookingDate=new Date().toJSON();
this.Booking.status=BOOKED;
this.Booking.canCancle=true;

this.booking.bookRide(this.Booking,this.Booking.id).subscribe(resp=>{this.Booking=resp;
  
  
  },
  error=>console.log(error));
    }
    else{
    
this.router.navigateByUrl("/login");


this.booking.bookRide(this.Booking,this.Booking.id).subscribe(resp=>{this.Booking=resp
 
},
  error=>console.log(error));
    }
  }
}