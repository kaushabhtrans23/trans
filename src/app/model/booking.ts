import { User } from "./user";
import { Fare } from "./fare";
import { Ride } from "./ride";
import { Vehicle } from "./vehicle";



export class Booking{
    public confirmed:boolean=false;
public roundTrip:boolean=true;
public id:string='';
public status:string='';
public bookingDate:string='';
public confirmDate:string='';
public cancleDate:string='';
public canCancle:boolean=true;
public fare:Fare=new Fare();
public ride:Ride=new Ride();
public vehicle:Vehicle=new Vehicle();
public startRideKm:string;
public endRideKm:string;
public select:boolean=false;
}