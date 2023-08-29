import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'https://dummyjson.com/';

  constructor(private http: HttpClient) {}

  get(endpoint: string, options?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url, options);
  }

  // Generalized method to make HTTP POST requests
  post(endpoint: string, data: any, options?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post(url, data, options);
  }

  // Generalized method to make HTTP PUT requests
  put(endpoint: string, data: any, options?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.put(url, data, options);
  }

  delete(endpoint: string, options?: any): Observable<any>{
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.delete(url, options);
  }







}
