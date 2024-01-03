import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import noDataModule from 'highcharts/modules/no-data-to-display';
import { ChartServiceService } from '../../services/chart-service.service';
import { Subscription } from 'rxjs';

noDataModule(Highcharts);
HighchartsMore(<any>Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges,OnDestroy {
  @Input() chartOptions: any;

  @Input() styleOptions: any = 'width:100%;height:200px';

  Highcharts: typeof Highcharts = Highcharts;
  changeDetection: boolean = false;
  subscription:any;
  constructor(private chart_service:ChartServiceService){

  }
  ngOnInit(): void {
  
    this.subscription = this.chart_service.mySubject.subscribe((data)=>{
      console.log(data);
      
      this.changeDetection = true;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {}
  
  ngOnDestroy(): void { 
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
