import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites/sites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SiteDetailsComponent } from './site-details/site-details.component';


@NgModule({
  declarations: [
    
  
    SitesComponent,
            SiteDetailsComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule
  ]
})
export class SitesModule { }
