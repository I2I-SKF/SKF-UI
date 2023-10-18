import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent {

  constructor(private bradcrumb:BreadcrumbService){

  }

 
  ngOnInit():void{
   

    
  }
}
