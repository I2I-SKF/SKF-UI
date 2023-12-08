import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordComponent } from './create-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CreatePasswordComponent
  ],
  imports: [
    CommonModule,
    CreatePasswordRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule

   
  ],
  providers:[
    
  ]
})
export class CreatePasswordModule { }
