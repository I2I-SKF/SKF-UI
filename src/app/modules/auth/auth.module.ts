import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {  HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { PasswordVerifyComponent } from './password-verify/password-verify.component';
import { RouterModule } from '@angular/router';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordVerifyComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule
  ]
})
export class AuthModule { }
