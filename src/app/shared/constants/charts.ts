export const CHART = {
  REVENUE_CHART: 'REVENUE_CHART',
  TANK_LEVEL: 'TANK_LEVEL',
  NO_DATA: 'NO_DATA',
  HOURLY_DISPENSES:'HOURLY_DISPENSES'
};

export const CHART_CONFIGURATIONS: { [key: string]: any } = {
  REVENUE_CHART: {
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
  },
  TANK_LEVEL: {
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
  },
  NO_DATA: {
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
  },
  HOURLY_DISPENSES:{
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Hourly Dispenses',
      style: {
        fontSize: '12px' // Set the desired font size for the chart title
    }
    },
    credits:{
      enabled:false
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
     
    ],
  }
};
