import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  private sharedData = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedData.asObservable();

  setSharedData(data: any) {
    this.sharedData.next(data);
  }
}
