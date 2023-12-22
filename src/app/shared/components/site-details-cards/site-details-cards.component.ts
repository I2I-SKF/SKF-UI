import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-site-details-cards',
  templateUrl: './site-details-cards.component.html',
  styleUrls: ['./site-details-cards.component.scss']
})
export class SiteDetailsCardsComponent {
  @Input() chartOptions:any;

  @Input() card_title:any;

  device_alerts_data = [
    {
      ID:'A001',
      "Type":'Low Tank Level',
      "Time":'DD/MM/YYYY HH:MM' ,
      "Description":'Alert message will be displayed here'
    },
    {
      ID:'A002',
      "Type":'Dispense Error',
      "Time":'DD/MM/YYYY HH:MM' ,
      "Description":'Alert message will be displayed here'
    },
    {
      ID:'A003',
      "Type":'Device Offline',
      "Time":'DD/MM/YYYY HH:MM' ,
      "Description":'Alert message will be displayed here'
    },
    {
      ID:'A004',
      "Type":'Dispense Error',
      "Time":'DD/MM/YYYY HH:MM' ,
      "Description":'Alert message will be displayed here'
    },
    {
      ID:'A005',
      "Type":'Low Tank Level',
      "Time":'DD/MM/YYYY HH:MM' ,
      "Description":'Alert message will be displayed here'
    },
  ]
  tanks_level_data = [
    {
      "Tank Name":'Tank 1',
      "Fluid Name":'Fluid 2',
      "Capacity":'1000 L',
      "Balance":'900 L',
      "Level":90
    },
    {
      "Tank Name":'Tank 2',
      "Fluid Name":'Fluid 2',
      "Capacity":'1000 L',
      "Balance":'800 L',
      "Level":80
    },
    {
      "Tank Name":'Tank 3',
      "Fluid Name":'Fluid 3',
      "Capacity":'1000 L',
      "Balance":'600 L',
      "Level":60
    },
    {
      "Tank Name":'Tank 4',
      "Fluid Name":'Fluid 4',
      "Capacity":'1000 L',
      "Balance":'500 L',
      "Level":50
    },
    {
      "Tank Name":'Tank 5',
      "Fluid Name":'Fluid 5',
      "Capacity":'1000 L',
      "Balance":'400 L',
      "Level":40
    },
  ]


  device_alerts_columns  = [
    'ID',
    'Type',
    'Time',
    'Description'
  ]

  tank_level_columns = [
    'Tank Name',
    'Fluid Name',
    'Capacity',
    'Balance',
    'Level'
  ]



}
