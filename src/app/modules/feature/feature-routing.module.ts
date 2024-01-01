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
import { RoleGuardService } from 'src/app/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // data: { breadcrumb: 'Home' }
    data: { breadcrumb: 'Users',roles:['1','3','2'] },
  },
  {
    path: 'home',
    component: DashboardComponent,
    // data: { breadcrumb: 'Home' }
    canActivate:[RoleGuardService],
    data: { breadcrumb: 'Users',roles:['1','3','2'] },
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    canActivate:[RoleGuardService],
    data: { breadcrumb: 'Users',roles:['1','3','2'] },
  },
  // {
  //   path: 'sites',
  //   loadChildren: () =>
  //     import('./sites/sites.module').then((m) => m.SitesModule),
    

  //     data: { breadcrumb: 'Users',roles:['1','2'] },
   
    
  // },
  // {
  //   path: 'reports',
  //   component:ReportsComponent,
  //   canActivate:[RoleGuardService],
  //   data: { breadcrumb: 'Users',roles:['1','3'] },
   
    
  // },
  {
    path: 'tanks',
    component:TankComponent,
    canActivate:[RoleGuardService],
    data: { breadcrumb: 'Users',roles:['1','2'] },
   
    
  },
  // {
  //   path: 'site-details',
  //   component: CommonSiteDetailComponent,
  
  //   canActivate:[RoleGuardService],
  //   data: { breadcrumb: 'Users',roles:['1','3'] },
  // },
  {
    path: 'devices',

    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesModule),
  
    canActivate:[RoleGuardService],
    data: { breadcrumb: 'Users',roles:['1','3','2'] },
  },
  {
    path: 'dispenses',

    loadChildren: () =>
      import('./dispenses/dispenses.module').then((m) => m.DispensesModule),
      canActivate:[RoleGuardService],
      data: { breadcrumb: 'Users',roles:['1','2'] },
    
  },
  {
    path: 'users',

    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    
    data: { breadcrumb: 'Users',roles:['1'] },
    canActivate:[RoleGuardService],
  },
  {
    path: 'support',
    loadChildren: () =>
    import('./support/support.module').then((m) => m.SupportModule),
    canActivate:[RoleGuardService],
     data: { breadcrumb: 'Users',roles:['1','2'] },
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




// if (role == '1') {
//   return 'Admin';
// }
// if (role == '3') {
//   return 'Device Manager';
// }
// if (role == '2') {
//   return 'Site Manager';
// }