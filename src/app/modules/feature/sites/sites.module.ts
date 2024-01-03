import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites/sites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { FeatureModule } from '../feature.module';


@NgModule({
  declarations: [
    
  
            SitesComponent,
            SiteDetailsComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
    FeatureModule
  ],
  exports:[SitesComponent,SiteDetailsComponent]
})
export class SitesModule { }
