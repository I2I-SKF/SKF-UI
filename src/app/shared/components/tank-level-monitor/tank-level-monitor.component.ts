import { Component ,Input } from '@angular/core';

@Component({
  selector: 'app-tank-level-monitor',
  templateUrl: './tank-level-monitor.component.html',
  styleUrls: ['./tank-level-monitor.component.scss']
})
export class TankLevelMonitorComponent {

  @Input() tank_data :any =  [
    {
      tank_name:'Tank A',
      tank_capacity:'',
      tank_level:10
    },
    {
      tank_name:'Tank B',
      tank_capacity:'',
      tank_level:20
    },
    {
      tank_name:'Tank C',
      tank_capacity:'',
      tank_level:30
    },
    {
      tank_name:'Tank D',
      tank_capacity:'',
      tank_level:40
    },
    
  ];

}
