

import {LocationAddress} from './locationAddress';
import { Vehicle } from './vehicle';
export class Ride {
public rideId:string;
 

  public startRide: LocationAddress;

  public endRide: LocationAddress;
  public enddate: string=new Date().toISOString().substring(0,16);
  public startdate: string=new Date().toISOString().substring(0,16);
 
  public extraComments:string;
  constructor() {
  
    this.startRide = new LocationAddress();
    this.endRide = new LocationAddress();
  }
 

}