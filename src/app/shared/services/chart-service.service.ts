import { Injectable } from '@angular/core';
import { CHART_CONFIGURATIONS } from '../constants/charts';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }
  
  mySubject = new Subject<string>();
  
  updateChart(chart:string,data:any[]){
      CHART_CONFIGURATIONS[chart].series = data;
      this.mySubject.next(chart);
  }



}
