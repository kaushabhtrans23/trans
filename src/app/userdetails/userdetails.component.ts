import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { User } from '../model/user';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
user:User=new User();
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.currentUser.subscribe(resp=>this.user=resp,
      error=>this.user=new User());
      this.user.userEmail
      this.user.userId
      this.user.userName
      this.user.userPhoneNumber
      
  }

}
