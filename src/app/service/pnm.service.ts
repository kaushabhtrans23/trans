import { Injectable } from '@angular/core';


import { Pnm } from '../model/pnm';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class PnmService {
  private saveDetailsUrl="/api/pnm/saveDetails"
  constructor(private http: HttpClient) { }

  saveDetails(pnm:Pnm):Observable<string>{
  return this.http.post<string>(this.saveDetailsUrl,pnm,httpOptions).pipe(tap(data =>
    {console.log("success")},
    err => {console.log("fail")}))
  }

}
