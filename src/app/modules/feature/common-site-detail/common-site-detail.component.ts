import { Component } from '@angular/core';

@Component({
  selector: 'app-common-site-detail',
  templateUrl: './common-site-detail.component.html',
  styleUrls: ['./common-site-detail.component.scss']
})
export class CommonSiteDetailComponent {

  chartOptions = {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Fluid Sales',
        align: 'center',
        style: {
          fontSize: '14px' // Set the desired font size for the chart title
      }
    },
   
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            '#FFFFFF'
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 60 * 60 * 1000, 
      labels: {
        format: '{value:%H:%M}' 
      }
    },
    yAxis: {
        title: {
            text: 'Quantity'
        }
    },
    tooltip: {
        shared: true,
        headerFormat: '<b></b>'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            pointStart: 2000
        },
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'Sales',
        data:[
            // [
            //   1200,2600,4800,600,1400,2700
            // ],
            [1661817600000, 1200],
            [1661821200000, 2600],
            [1661824800000, 4800],
            [1661828400000, 600],
            [1661832000000, 1400],
            [1661835600000, 2700],
        ]
    }]
}
   chartOptionsPie ={
  chart: {
      type: 'pie'
  },
  title: {
    text: '',
    align: 'center',
    style: {
      fontSize: '14px' // Set the desired font size for the chart title
  }
},
  
 

  accessibility: {
      announceNewData: {
          enabled: true
      },
      point: {
          valueSuffix: '%'
      }
  },

  plotOptions: {
      series: {
          // borderRadius: 5,
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'
          }
      }
  },

  

  series: [
      {
         
          data: [
              {
                  name: 'Fluid 1',
                  y: 42.1,
                  
              },
              {
                  name: 'Fluid 2',
                  y: 31.6,
                  
              },
              {
                  name: 'FLuid 3',
                  y: 15.8,
                  
              },
              {
                  name: 'Fluid 4',
                  y: 10.5,
                  
              },
             
          ]
      }
  ],
  
}
columns: string[] = [
  'Customer Name',
  'Dispense ID',
  'Station ID',
  'Fluid ID',

  'Ord.vol.',
  'Disp.vol.',
  'Unit',
  'Start Time',
  'End Time',
  'Status',
  'Dispense By'  
  
];

table_data = [
  {
  'Customer Name':'John Doe',
  'Dispense ID':12345,
  'Station ID':101,
  'Fluid ID':'F1001',
  'Ord.vol.':10,
  'Disp.vol.':9,
  'Unit':'gallon',
  'Start Time':'23-08-22 08:00',
  'End Time':'23-08-22 08:00',
  'Status':'Success',
  'Dispense By':'Jane Smith'
  },
  {
  'Customer Name':'John Doe',
  'Dispense ID':12345,
  'Station ID':101,
  'Fluid ID':'F1001',

  'Ord.vol.':10,
  'Disp.vol.':9,
  'Unit':'gallon',
  'Start Time':'23-08-22 08:00',
  'End Time':'23-08-22 08:00',
  'Status':'Success',
  'Dispense By':'Jane Smith'
  },
  {
  'Customer Name':'John Doe',
  'Dispense ID':12345,
  'Station ID':101,
  'Fluid ID':'F1001',

  'Ord.vol.':10,
  'Disp.vol.':9,
  'Unit':'gallon',
  'Start Time':'23-08-22 08:00',
  'End Time':'23-08-22 08:00',
  'Status':'Success',
  'Dispense By':'Jane Smith'
  },
  {
  'Customer Name':'John Doe',
  'Dispense ID':12345,
  'Station ID':101,
  'Fluid ID':'F1001',

  'Ord.vol.':10,
  'Disp.vol.':9,
  'Unit':'gallon',
  'Start Time':'23-08-22 08:00',
  'End Time':'23-08-22 08:00',
  'Status':'Success',
  'Dispense By':'Jane Smith'
  },
]

}
