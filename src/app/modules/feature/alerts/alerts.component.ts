import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  displayed_columns = [
   "Date & Time",
   "Device Name",
   "Location",
   "Alert Type",
   "Description"
  ];
  dispensesForm:any;
  
  devices_data = [
    { viewValue: 'Device 1, Pune', value: '00001UZ1XYETP' },
    { viewValue: 'Device 2, St. Louis', value: '00001S81KOXLA' },
  ];

  data = [
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device Name":"",
   "Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  ]
  alert_data = [
    {value:3,viewValue:3},
    {value:6,viewValue:6}
  ]

  constructor(private breadcrumbs:BreadcrumbService,private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.breadcrumbs.setBreadcrumb([
      {
        name:'Home',
        link:'/feature/home'
      },
      {
        name:'Alerts',
        link:''
      },
     
    ]);
    let date = new Date();
    this.dispensesForm = this.fb.group({
      devices: [this.devices_data[0].value],
      start_date: [],
      end_date: [],
      alert: [3],
     
      
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
  onDeviceChange(data:any){

  }
  startDateChange(data:any){

  }
  endDateChange(data:any){

  }

  getData(){

  }

  onAlertChange(data:any){

  }
}
