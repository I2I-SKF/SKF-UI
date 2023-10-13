import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensesRoutingModule } from './dispenses-routing.module';
import { DispensesComponent } from './dispenses/dispenses.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DispensesComponent
  ],
  imports: [
    CommonModule,
    DispensesRoutingModule,
    SharedModule
  ]
})
export class DispensesModule { }
