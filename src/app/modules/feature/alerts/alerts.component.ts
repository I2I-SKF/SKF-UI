import { Component,OnInit } from '@angular/core';
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

  constructor(private breadcrumbs:BreadcrumbService){

  }

  ngOnInit(): void {
    this.breadcrumbs.setBreadcrumb([
      {
        name:'Home',
        link:'/home'
      },
      {
        name:'Alerts',
        link:'/alerts'
      },
     
    ]);
  }
}
