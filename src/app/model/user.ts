import { LocationAddress } from './locationAddress';

import { Ride } from './ride';
import { Booking } from './booking';

export class User {
  public userName:string="";
  public userId:string="";
 public userPhoneNumber:LongRange;
  public userEmail:string="";

  public userPassword:string="";

 
  public allbooking:Booking[]=[];
  public homeAddress:LocationAddress=new LocationAddress();
  
  public isUserHomeaddressFilled:boolean=false;

public role:string="";
public token:string="";
}