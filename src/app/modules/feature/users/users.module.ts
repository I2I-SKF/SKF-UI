import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { DialogModule } from '@angular/cdk/dialog';


@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    DialogModule,
    
  ]
})
export class UsersModule { }
