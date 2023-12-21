import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AlertsComponent } from './alerts/alerts.component';
import { CommonSiteDetailComponent } from './common-site-detail/common-site-detail.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReportsComponent } from './reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { DispensesModule } from './dispenses/dispenses.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TankComponent } from './tank/tank.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    FeatureComponent,
    DashboardComponent,
    AlertsComponent,
    CommonSiteDetailComponent,
    ReportsComponent,
    TankComponent,

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
    HttpClientModule,
    DispensesModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbProgressbarModule
    
    
  
    

  ],
  
  exports:[CommonSiteDetailComponent]
 
})
export class FeatureModule { }
