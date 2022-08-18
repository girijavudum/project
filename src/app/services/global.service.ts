import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  getEnerygyData(){
    return this.http.get('./assets/updated.csv',{responseType:'text'})
  }

}
