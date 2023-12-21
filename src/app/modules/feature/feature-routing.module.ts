import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CommonSiteDetailComponent } from './common-site-detail/common-site-detail.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';
import { SitesComponent } from './sites/sites/sites.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportComponent } from './support/support.component';
import { TankComponent } from './tank/tank.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // data: { breadcrumb: 'Home' }
  },
  {
    path: 'home',
    component: DashboardComponent,
    // data: { breadcrumb: 'Home' }
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    data: { breadcrumb: 'Alerts' },
  },
  {
    path: 'sites',
    loadChildren: () =>
      import('./sites/sites.module').then((m) => m.SitesModule),
      data:{breadcrumb:'Sites'}
    
   
    
  },
  {
    path: 'reports',
    component:ReportsComponent
    
   
    
  },
  {
    path: 'tanks',
    component:TankComponent
    
   
    
  },
  {
    path: 'site-details',
    component: CommonSiteDetailComponent,
    data: { breadcrumb: 'Site Details' },
  },
  {
    path: 'devices',

    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesModule),
    data: { breadcrumb: 'Devices' },
  },
  {
    path: 'dispenses',

    loadChildren: () =>
      import('./dispenses/dispenses.module').then((m) => m.DispensesModule),
    
  },
  {
    path: 'users',

    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    data: { breadcrumb: 'Users' },
  },
  {
    path: 'support',
    loadChildren: () =>
    import('./support/support.module').then((m) => m.SupportModule),
     data: { breadcrumb: 'Users' },
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
