import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordVerifyComponent } from './password-verify/password-verify.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path:'',
    // component:LoginComponent,
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
   
    pathMatch:'full'
  },
  {
    path:'request-reset-password',
    component:PasswordVerifyComponent,
  },
  {
    path:'password-reset',
    component:PasswordResetComponent,
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
