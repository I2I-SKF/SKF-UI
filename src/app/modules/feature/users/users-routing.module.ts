import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RoleGuardService } from 'src/app/role.guard';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    data: { breadcrumb: 'Users' }
  },
  {
    path:'add-user',
    component:AddUserComponent,
 
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
