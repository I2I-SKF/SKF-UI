import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensesRoutingModule } from './dispenses-routing.module';
import { DispensesComponent } from './dispenses/dispenses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DispensesComponent
  ],
  imports: [
    CommonModule,
    DispensesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DispensesModule { }
