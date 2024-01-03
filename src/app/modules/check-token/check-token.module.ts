import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckTokenRoutingModule } from './check-token-routing.module';
import { CheckTokenComponent } from './check-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CheckTokenComponent
  ],
  imports: [
    CommonModule,
    CheckTokenRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CheckTokenModule { }
