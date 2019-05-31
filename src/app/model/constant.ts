 import { User } from './user';
import { Vehicle } from './vehicle';
import { appUsersAuth } from '../security/app-users-auth';
import { resetHome } from './resetHome';
export const  cacheMemory: Map<string, Object> = new Map();
export const DRIVER_PER_DAY_Allowance:number=249;
export const SEDAN:number=11;
export const MINI:number=10;
export const SUV:number=14;
export const TRAVELLER:number=25;
export const EXTRA_ADDED_KM:number=50;
export const FARE:string="FARE";
export const CONFIRM:string="CONFIRM";
export const CANCELED:string="CANCELED";
export const BOOKED:string="BOOKED";
export const ONGOING:string="ONGOING";
export const COMPLETE:string="COMPLETE";
export const securityObject:appUsersAuth=new appUsersAuth();
export const reset:resetHome=new resetHome();




 //export const  VehicleListConst: Vehicle[] = [];
//export const userDetails:User=new User();

