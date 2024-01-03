import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispensesComponent } from './dispenses/dispenses.component';

const routes: Routes = [
  {
    path:'',
    component:DispensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensesRoutingModule { }
