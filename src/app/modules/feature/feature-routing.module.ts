import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SitesComponent } from './sites/sites.component';
import { CommonSiteDetailComponent } from './common-site-detail/common-site-detail.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
    
  },
  {
    path:'home',
    component:DashboardComponent
    
  },
  {
    path:'alerts',
    component:AlertsComponent
    
  },
  {
    path:'sites',
    component:SitesComponent
    
  },
  {
    path:'site-details',
    component:CommonSiteDetailComponent
    
  },
  {
    path:'devices',
    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesModule),
    
  },
  
  {
    path:'**',
    component:PageNotFoundComponent
    
  },
  
  

 
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
