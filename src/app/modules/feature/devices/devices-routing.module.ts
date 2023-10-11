import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';

const routes: Routes = [
  {
    path:'',
    component:DeviceComponent,
    data: { breadcrumb: 'Devices' }
  },
  {
    path:'device-details',
    component:DeviceDetailsComponent,
    data:{breadcrumb:'Device Details'}
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
