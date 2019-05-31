import { cacheMemory } from '../model/constant';
import { User } from '../model/user';
import { DataService } from './data.service';
import { UserService } from './user.service';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
  
  
export class DataResolveService implements Resolve<User>{
  user:User;
 
  observable:Observable<User>;
 
  constructor(private userService:UserService,private dataService:DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):User | Observable<User> | Promise<User> {

    
  if(null==cacheMemory.get("loginId"))
    {
    
  this.dataService.updateUser(new User());
  }
    else{
    
    if(null!= cacheMemory.get(<string>cacheMemory.get("loginId")))
      {
    
     // this.dataService.updateUser(<User>cacheMemory.get(<string>cacheMemory.get("loginId")));
    return <User>cacheMemory.get(<string>cacheMemory.get("loginId"));
    }
    else {
     
       this.observable= this.userService.getUserDetails(<string>cacheMemory.get("loginId"));
   this.observable.subscribe(user=>{this.user=user;
 
     if(undefined!=this.user){
 
     this.dataService.updateUser(this.user);
     cacheMemory.set(<string>cacheMemory.get("loginId"),this.user);
     }
     else if(undefined==this.user){
  
       this.dataService.updateUser(new User());
     }
   });

   return this.observable;
    
    }
  }
  }

}
