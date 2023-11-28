import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-site-details-cards',
  templateUrl: './site-details-cards.component.html',
  styleUrls: ['./site-details-cards.component.scss']
})
export class SiteDetailsCardsComponent {
  @Input() chartOptions:any;

  @Input() card_title:any;

  alarms = [
    {
      id:'A001',
      type:'Low Tank Level',
      time:'DD/MM/YYYY HH:MM' ,
      description:'Alert message will be displayed here'
    },
    {
      id:'A002',
      type:'Dispense Error',
      time:'DD/MM/YYYY HH:MM' ,
      description:'Alert message will be displayed here'
    },
    {
      id:'A003',
      type:'Device Offline',
      time:'DD/MM/YYYY HH:MM' ,
      description:'Alert message will be displayed here'
    },
    {
      id:'A004',
      type:'Dispense Error',
      time:'DD/MM/YYYY HH:MM' ,
      description:'Alert message will be displayed here'
    },
    {
      id:'A005',
      type:'Low Tank Level',
      time:'DD/MM/YYYY HH:MM' ,
      description:'Alert message will be displayed here'
    },
  ]
  tanks = [
    {
      tank_name:'Tank 1',
      fluid_name:'Fluid 2',
      capacity:'1000 L',
      balance:'900 L',
      level:90
    },
    {
      tank_name:'Tank 2',
      fluid_name:'Fluid 2',
      capacity:'1000 L',
      balance:'800 L',
      level:80
    },
    {
      tank_name:'Tank 3',
      fluid_name:'Fluid 3',
      capacity:'1000 L',
      balance:'600 L',
      level:60
    },
    {
      tank_name:'Tank 4',
      fluid_name:'Fluid 4',
      capacity:'1000 L',
      balance:'500 L',
      level:50
    },
    {
      tank_name:'Tank 5',
      fluid_name:'Fluid 5',
      capacity:'1000 L',
      balance:'400 L',
      level:40
    },
  ]

}
