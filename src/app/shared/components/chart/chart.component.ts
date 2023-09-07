import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import noDataModule from 'highcharts/modules/no-data-to-display';
import { ChartServiceService } from '../../services/chart-service.service';

noDataModule(Highcharts);
HighchartsMore(<any>Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartOptions: any;
  dummy:any;
  @Input() styleOptions: any = 'width:100%;height:200px';

  Highcharts: typeof Highcharts = Highcharts;
  changeDetection: boolean = false;
  constructor(private chart_service:ChartServiceService){

  }
  ngOnInit(): void {
    this.dummy = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Hourly Dispenses',
        style: {
          fontSize: '14px' // Set the desired font size for the chart title
      }
      },
     
      xAxis: {
        type: 'datetime',
        tickInterval: 60 * 60 * 1000, // 1 hour in milliseconds
        labels: {
          format: '{value:%H:%M}' // Format for displaying time
        }
      },
      yAxis: {
        min: 0,
        max:100,
        tickInterval:100,
        title:{
          text:null
        }
       
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      legend: {
        itemStyle: {
            fontSize: '10px'  // Set the desired font size for legend text
        }
    },

      series: [

        {
          name: 'Fluid 1',data:[
            [1661817600000, 68.2],
            [1661821200000, 73.5],
            [1661824800000, 61.8],
            [1661828400000, 57.3],
            [1661832000000, 82.6],
            [1661835600000, 92.1],
          ],
        },
        {
          name: 'Fluid 2',data:[
            [1661817600000, 95.3],
            [1661821200000, 71.6],
            [1661824800000, 53.9],
            [1661828400000, 82.4],
            [1661832000000, 64.1],
            [1661835600000, 59.7],
          ],
         
        },
        {
          name: 'Fluid 3',
          data:[
            [1661817600000, 79.8],
            [1661821200000, 87.2],
            [1661824800000, 62.5],
            [1661828400000, 54.3],
            [1661832000000, 70.1],
            [1661835600000, 75.6],
          ],
        
        },
        {
          name: 'Fluid 4',
          data:  [
            [1661817600000, 56.7],
            [1661821200000, 61.2],
            [1661824800000, 88.4],
            [1661828400000, 76.9],
            [1661832000000, 63.5],
            [1661835600000, 70.8],
          ],
        },
      ],
    };
    this.chart_service.mySubject.subscribe(()=>{
      this.changeDetection = true;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
