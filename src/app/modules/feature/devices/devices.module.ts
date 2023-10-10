import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceComponent } from './device/device.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeviceComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule
  ]
})
export class DevicesModule { }
