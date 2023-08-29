import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SitesComponent } from './sites/sites.component';
import { CommonSiteDetailComponent } from './common-site-detail/common-site-detail.component';

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
  

 
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
