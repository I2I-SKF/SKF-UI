import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http:HttpClient){

    }

    cloud_url = `https://5vvz2ksfs2.execute-api.us-east-1.amazonaws.com/DEV`;


    getDataFromCloud(payload:any):Observable<any>{
        return this.http.post(this.cloud_url, payload);
    }




}
