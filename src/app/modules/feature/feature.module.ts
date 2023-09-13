import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AlertsComponent } from './alerts/alerts.component';
import { SitesComponent } from './sites/sites.component';
import { CommonSiteDetailComponent } from './common-site-detail/common-site-detail.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    FeatureComponent,
    DashboardComponent,
    AlertsComponent,
    SitesComponent,
    CommonSiteDetailComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    LayoutsModule,
    HighchartsChartModule,
    SharedModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
  
    

  ],
 
 
})
export class FeatureModule { }
