import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { CHART, CHART_CONFIGURATIONS } from 'src/app/shared/constants/charts';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { ChartServiceService } from 'src/app/shared/services/chart-service.service';
import { ExportCsvService } from 'src/app/shared/services/export-csv.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  revenue_chart = CHART_CONFIGURATIONS[CHART.REVENUE_CHART];
  tank_level_chart = CHART_CONFIGURATIONS[CHART.TANK_LEVEL];
  no_data_chart = CHART_CONFIGURATIONS[CHART.NO_DATA];
  hourly_dispenses = CHART_CONFIGURATIONS[CHART.HOURLY_DISPENSES];

  constructor(
    private dialog: MatDialog,
    private chart: ChartServiceService,
    public toastService: ToastService,
    public breadcrumbService: BreadcrumbService,
    private httpclient:HttpClient,
    private export_csv:ExportCsvService
  ) {}
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/home'
      },
     
    ]);
  }

 

  openDialog(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'Modal Title',
      },
    });
  }

 

  updateRevenueChart() {
    this.chart.updateChart(CHART.REVENUE_CHART, [
      {
        name: 'Fluid 1',
        data: [200],
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
        data: [1800],
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
        data: [112.8],
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
        data: [500.2],
        dataLabels: {
          enabled: true,
          format: '{y}',
          style: {
            fontSize: '10px',
          },
        },
      },
    ]);
  }


 
}
