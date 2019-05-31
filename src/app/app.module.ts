import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { RouterModule, Route, RouteReuseStrategy } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouteModule } from './route/route.module';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomReuseStrategy } from './CustomReuseStrategy';
import {HttpClientModule} from '@angular/common/http';
import { AppMaterialModule } from './app.material.module';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { FareComponent } from './fare/fare.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { DialogComponent } from './dialog/dialog.component';

import { BookingchildComponent } from './bookingchild/bookingchild.component';
import { PNCComponent } from './pnc/pnc.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
enableProdMode();
@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    HeaderComponent,

    FooterComponent,

    LoginComponent,

    RegisterComponent,

    AdminComponent,

    BookingsComponent,

    UserdetailsComponent,
    FareComponent,
    SnackbarComponent,
    DialogComponent,
 
    BookingchildComponent,
 
    PNCComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,AgmCoreModule.forRoot({
      apiKey:'AIzaSyDVI-NRQzP9WotO9scEAr8YCKYGplbLUPg'
      }),GooglePlaceModule,  RouteModule,HttpClientModule,
      AppMaterialModule,FormsModule,BrowserAnimationsModule,NgbModule
      ,DlDateTimePickerDateModule,GooglePlaceModule,NgxMaterialTimepickerModule.forRoot(),OwlDateTimeModule,
      OwlNativeDateTimeModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },HttpInterceptorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
