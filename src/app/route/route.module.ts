import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from '../bookings/bookings.component';
import { HomeComponent } from '../home/home.component';
import { AdminComponent } from '../admin/admin.component';
import { RegisterComponent } from '../register/register.component';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { LoginComponent } from '../login/login.component';
import { DataResolveService } from '../service/data-resolve.service';
import { AuthGuard } from '../security/auth.guard';
import { BookingDataResolveServiceService } from '../service/booking-data-resolve-service.service';
const routes: Routes = [
  {
    path: 'myBooking',
    component: BookingsComponent,
    canActivate: [AuthGuard],
    data: {claimType: 'canViewRide'},
    resolve: {
      user: DataResolveService
    }
   
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
     
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { shouldAttach: false,shouldDetach: true},
    resolve: {
      user: DataResolveService
    }
    
  },
  
  
  
  {

    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {claimType: 'canViewRide'},resolve: {
      user: DataResolveService
    }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userDetails',
    component: UserdetailsComponent,
    canActivate: [AuthGuard],
    data: {claimType: 'canViewRide'},
    resolve: {
      user: DataResolveService
    }
  },
  {
    path: 'login',
    component: LoginComponent
    
  }];
@NgModule(
  {
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
  }
)
export class RouteModule { }
