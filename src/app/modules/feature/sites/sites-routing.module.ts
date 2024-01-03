import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesComponent } from './sites/sites.component';
import { SiteDetailsComponent } from './site-details/site-details.component';

const routes: Routes = [
  {
    path:'',
    component:SitesComponent,
    data: { breadcrumb: 'Sites' }
  },
  {
    path:'site-details/:name',
    component:SiteDetailsComponent,
    data: { breadcrumb: 'Site Details' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
