import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  displayed_columns = [
   "Date & Time",
   "Device",
   "Site and Location",
   "Alert Type",
   "Description"
  ];

  data = [
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Health",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Device Offline",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  {
   "Date & Time":"",
   "Device":"",
   "Site and Location":"",
   "Alert Type":"Dispense Error",
   "Description":""
  },
  ]
}
