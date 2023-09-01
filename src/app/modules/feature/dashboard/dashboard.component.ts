import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Revenue($)',
      style: {
        fontSize: '14px', // Set the desired font size for the chart title
      },
    },

    xAxis: {
      title: {
        text: '$',
      },
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,
      tickInterval: 1000,

      title: {
        text: null,
      },
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
        fontSize: '10px', // Set the desired font size for legend text
      },
    },

    series: [
      {
        name: 'Fluid 1',
        data: [1200],
        dataLabels: {
          enabled: true, // Show data labels
          format: '{y}', // Display the y value
          style: {
            fontSize: '10px', // Set the font size of the data labels
          },
        },
      },
      {
        name: 'Fluid 2',
        data: [800.5],
        dataLabels: {
          enabled: true,
          format: '{y}',
          style: {
            fontSize: '10px',
          },
        },
      },
      {
        name: 'Fluid 3',
        data: [1120.8],
        dataLabels: {
          enabled: true,
          format: '{y}',
          style: {
            fontSize: '10px',
          },
        },
      },
      {
        name: 'Fluid 4',
        data: [758.2],
        dataLabels: {
          enabled: true,
          format: '{y}',
          style: {
            fontSize: '10px',
          },
        },
      },
    ],
  };
  tank_level = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tank Level',
      style: {
        fontSize: '14px', // Set the desired font size for the chart title
      },
    },

    xAxis: {
      labels: {
        style: {
          fontSize: '8px', // Set the desired font size for x-axis labels
        },
      },
      categories: [
        'Fluid 1',
        'Fluid 2',
        'Fluid 3',
        'Fluid 4',
        'Fluid 5',
        'Fluid 6',
      ],
    },
    yAxis: {
      min: 0,

      title: {
        text: null,
      },
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
      series: {
        label: {
          enabled: false,
        },
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },

    series: [
      {
        data: [
          {
            y: 60,
            color: 'grey',
          },
          {
            y: 95,
            color: 'grey',
          },
          {
            y: 50,
            color: 'yellow',
          },
          {
            y: 95,
            color: 'grey',
          },
          {
            y: 20,
            color: 'red',
          },
          {
            y: 90,
            color: 'grey',
          },
        ],
        showInLegend: false,
      },
    ],
  };
  no_data = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tank Level',
      style: {
        fontSize: '14px', // Set the desired font size for the chart title
      },
    },

    lang: {
      useHtml: true,
      noData: `
      
      <div class="d-flex  align-items-center justify-content-center" >
      <span class="material-symbols-outlined" style="color:grey;font-size:30px" >
  cloud_off
      </span>
  </div>
      
      `,
    },
    xAxis: {
      labels: {
        style: {
          fontSize: '8px', // Set the desired font size for x-axis labels
        },
      },
      categories: [],
    },
    yAxis: {
      min: 0,

      title: {
        text: null,
      },
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
        fontSize: '10px', // Set the desired font size for legend text
      },
    },

    series: [],
    noData: {
      position: {
        align: 'center',
        verticalAlign: 'middle',
        x: 40,
        y: 0,
      },
    },
  };

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
   

    const dialogRef = this.dialog.open(CommonDialogComponent, {
     
      data: {
        title: 'Modal Title',
        
      },
    });
  }
}
