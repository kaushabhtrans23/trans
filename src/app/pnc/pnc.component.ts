import { Component, OnInit } from '@angular/core';
import { Pnm } from '../model/pnm';
import { LocationAddress } from '../model/locationAddress';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { PnmService } from '../service/pnm.service';
export interface Items{
  name:string;
}
@Component({
  selector: 'app-pnc',
  templateUrl: './pnc.component.html',
  styleUrls: ['./pnc.component.css']
})

export class PNCComponent implements OnInit {
  Fruit;
  
   pnm:Pnm;
   min;
   popup;
   GetRideDetails;
   page1:boolean=true;
   page2:boolean;
   page3:boolean;
   rk1:boolean=true;
   bhk1:boolean;
   bhk2:boolean;
   bhk3:boolean;
   rklite:boolean;
   rkheavy:boolean;
   onebhklite:boolean;
   onebhkheavy:boolean;
   twobhklite:boolean;
   twobhkheavy:boolean;
   threebhklite:boolean;
   threebhkheavy:boolean;
  constructor(private pnmservice:PnmService) { }

  ngOnInit() {
    this.pnm=new Pnm();
    
   
  }
  changepage(indicator:string){
if(indicator==='next')
{
  if(this.page1==true){

    this.page1=false;
    this.page2=true;
    this.page3=false;
  }
else
if(this.page2==true){

  this.page2=false;
  this.page3=true;
  this.page1=false;

}

}
else if(indicator==='back')
{
if(this.page3==true){
this.page3=false;
this.page2=true;
this.page1=false;
}
else
if(this.page2==true){
  this.page3=false;
  this.page2=false;
  this.page1=true;
  }
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

      this.pnm.movingFrom=locationAddress;
    }
    else{
      locationAddress.latitude = address.geometry.location.lat();
      locationAddress.longitude = address.geometry.location.lng();
      locationAddress.formattedAddress = address.formatted_address;
      this.pnm.movingTo=locationAddress;
    }
  }
next(page :number){

}



display(type:string){
if(type==='1BHK')
{
  this.bhk1=true;
  this.bhk2=false;
  this.bhk3=false;
  this.rk1=false;
  document.getElementById("1bhk").className="col-2 border border1 pointer"
  
  document.getElementById("2bhk").className='col-2 border pointer';
  document.getElementById("3bhk").className='col-2 border pointer';
  document.getElementById("1rk").className='col-2 border pointer';
 this.pnm.date
}else if(type==='2BHK')
{
  this.bhk1=false;
  this.bhk2=true;
  this.bhk3=false;
  this.rk1=false;
  document.getElementById("1bhk").className='col-2 border pointer';
  document.getElementById("2bhk").className='col-2 border border1 pointer';
  document.getElementById("3bhk").className='col-2 border pointer';
  document.getElementById("1rk").className='col-2 border pointer';
}
else if(type==='3BHK'){
  this.bhk1=false;
  this.bhk2=false;
  this.bhk3=true;
  this.rk1=false;
  document.getElementById("1bhk").className='col-2 border pointer';
  document.getElementById("2bhk").className='col-2 border pointer';
  document.getElementById("3bhk").className='col-2 border border1 pointer';
  document.getElementById("1rk").className='col-2 border pointer';
}
else if(type==='1RK'){
  this.bhk1=false;
  this.bhk2=false;
  this.bhk3=false;
  this.rk1=true;
  document.getElementById("1bhk").className='col-2 border pointer';
  document.getElementById("2bhk").className='col-2 border pointer';
  document.getElementById("3bhk").className='col-2 border pointer';
  document.getElementById("1rk").className='col-2 border border1 pointer';
}
}








visible = true;
selectable = true;
removable = true;
addOnBlur = true;
readonly separatorKeysCodes: number[] = [ENTER, COMMA];
items: Items[] = [
  {name: '1 TV & TV Stand'},
  {name: '2 Chairs'},
  {name: '1 Washing Machine'},
  {name: '1 Fridge'},
  {name: '1 Single Cot'},
  {name: '10 Carton Box'},
];
items1rkheavy:Items[] = [
  {name: '1 TV & TV Stand'},
  {name: '2 Chairs'},
  {name: '1 Washing Machine'},
  {name: '1 Fridge'},
  {name: '1 Single Cot'},
  {name: '15 Carton Box'},
  {name: '1 Almira'},
  {name: '1 Gas Stove'},
];
items1bhklite:Items[] = [
  {name: '1 TV & TV Stand'},
  {name: '2 Chairs'},
  {name: '1 Washing Machine'},
  {name: '1 Fridge'},
  {name: '1 Single Cot'},
  {name: '15 Carton Box'},
  {name: '1 Almira'},
  {name: '1 Gas Stove'},
 
];
items1bhkheavy:Items[] = [
  {name: '1 TV & TV Stand'},
  {name: '4 Chairs'},
  {name: '1 Washing Machine'},
  {name: '1 Fridge'},
  {name: '1 Single Cot'},
  {name: '15 Carton Box'},
  {name: '1 Almira'},
  {name: '1 Gas Stove'},
  {name: '1 Double Cot (non storage)'},
  {name: '2 MATRESS'},
  {name: '1 Centre Table'},
  {name: 'Sofa 3 (except recliner)'},
  {name: 'Water Purifier'},
   ];
   items2bhklite:Items[] = [
    {name: '1 TV & TV Stand'},
    {name: '6 Chairs'},
    {name: '1 Washing Machine'},
    {name: '1 Fridge'},
    {name: '1 Single Cot'},
    {name: '15-20 Carton Box'},
    {name: '1 Almira'},
    {name: '1 Gas Stove'},
    {name: '2 Double COT / 1 doublebed + 1 Single Cot + diwan'},
    {name: '3 MATRESS'},
    {name: '1 Centre Table'},
    {name: 'Sofa 3 (except recliner)'},
    {name: 'Water Purifier'},
    {name: '2 door wardrobe'},
    {name: '1 Dining Table / 4 siter'},
    {name: '1 Shoe Rack'},
     ];
     items2bhkheavy:Items[] = [
      {name: '1 TV & TV Stand'},
      {name: '6 Chairs'},
      {name: '1 Washing Machine'},
      {name: '1 Fridge'},
      {name: '2 Double Cot'},
      {name: '30 Carton Box'},
      {name: '2 Almira'},
      {name: '1 Gas Stove'},
      {name: '1 Single Cot/diwan'},
      {name: '5 MATRESS'},
      {name: '1 Centre Table'},
      {name: 'Sofa 3 (except recliner)'},
      {name: 'Water Purifier'},
      {name: '2 door wardrobe'},
      {name: '1 Dining Table / 6 siter'},
      {name: '1 Shoe Rack'},
      {name: 'Study Table'},
       ];
       items3bhklite:Items[] = [
        {name: '1 TV & TV Stand'},
        {name: '6 Chairs'},
        {name: '1 Washing Machine'},
        {name: '1 Fridge'},
        {name: '2 Double Cot'},
        {name: '35 Carton Box'},
        {name: '2 Almira'},
        {name: '1 Gas Stove'},
        {name: '1 Single Cot/diwan'},
        {name: '5 MATRESS'},
        {name: '1 Centre Table'},
        {name: 'Sofa 3+2+1'},
        {name: 'Water Purifier'},
        {name: '2 door wardrobe'},
        {name: '1 Dining Table / 6 siter'},
        {name: '1 Shoe Rack'},
        {name: 'Study Table'},
         ];
         items3bhkheavy:Items[] = [
          {name: '1 TV & TV Stand'},
          {name: '6 Chairs'},
          {name: '1 Washing Machine'},
          {name: '1 Fridge'},
          {name: '2 Double Cot'},
          {name: '40 Carton Box'},
          {name: '3 Almira'},
          {name: '1 Gas Stove'},
          {name: '3 Single Cot/diwan'},
          {name: '6 MATRESS'},
          {name: '1 Centre Table'},
          {name: 'Sofa 3+2+1'},
          {name: 'Water Purifier'},
          {name: '2 door wardrobe'},
          {name: '1 Dining Table / 6 siter'},
          {name: '1 Shoe Rack'},
          {name: 'Study Table'},
           ];
    add(event: MatChipInputEvent,items:Items[]): void {
  const input = event.input;
  const value = event.value;

  // Add our fruit
  if ((value || '').trim()) {
    items.push({name: value.trim()});
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }
}

remove(item: Items,items:Items[]): void {
  const index = items.indexOf(item);

  if (index >= 0) {
    items.splice(index, 1);
  }
}
changecheckbox(check:string){

if('rklite'==check)
{
  this.pnm.items=this.items;
  this.pnm.type=check;
  this.rkheavy=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  this.twobhklite=false;
  this.twobhkheavy=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}else if('rkheavy'==check){
  this.pnm.items=this.items1rkheavy;
  this.pnm.type=check;
  this.rklite=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  this.twobhklite=false;
  this.twobhkheavy=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}else if('onebhklite'==check){
  this.pnm.items=this.items1bhklite;
  this.pnm.type=check;
  this.rkheavy=false;
  this.rklite=false;
  this.onebhkheavy=false;
  this.twobhklite=false;
  this.twobhkheavy=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}
else if('onebhkheavy'==check){
  this.pnm.items=this.items1bhkheavy;
  this.pnm.type=check;
  this.rkheavy=false;

  this.rklite=false;
  this.onebhklite=false;
  this.twobhklite=false;
  this.twobhkheavy=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}
else if('twobhklite'==check){
  this.pnm.items=this.items2bhklite;
  this.pnm.type=check;
  this.rkheavy=false;
  this.rklite=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  
  this.twobhkheavy=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}
else if('twobhkheavy'==check){
  this.pnm.items=this.items2bhkheavy;
  this.pnm.type=check;
  this.rkheavy=false;
  this.rklite=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  
  this.twobhklite=false;
  this.threebhklite=false;
  this.threebhkheavy=false;
}
else if('threebhklite'==check){
  this.pnm.items=this.items3bhklite;
  this.pnm.type=check;
  this.rkheavy=false;
  this.rklite=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  this.twobhkheavy=false;
  this.twobhklite=false;

  this.threebhkheavy=false;
}
else if('threebhkheavy'==check){
  this.pnm.items=this.items3bhkheavy;
  this.pnm.type=check;
  this.rkheavy=false;
  this.rklite=false;
  this.onebhklite=false;
  this.onebhkheavy=false;
  this.twobhkheavy=false;
  this.twobhklite=false;
  this.threebhklite=false;
 
}
}
submit(){
  this.pnmservice.saveDetails(this.pnm).subscribe(data=>console.log("success"),
  err=>console.log("error"));
}
}
