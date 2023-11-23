import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceComponent } from './device/device.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    DeviceComponent,
    DeviceDetailsComponent,
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DevicesModule { }
