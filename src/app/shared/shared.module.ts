import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './components/chart/chart.component';
import { NavigationDropdownComponent } from './components/navigation-dropdown/navigation-dropdown.component';
import { ButtomComponent } from './components/buttom/buttom.component';
import {MatButtonModule} from '@angular/material/button';
import { CommonCardComponent } from './components/common-card/common-card.component';
import { SiteDetailsCardsComponent } from './components/site-details-cards/site-details-cards.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    
    ChartComponent,
    NavigationDropdownComponent,
    ButtomComponent,
    CommonCardComponent,
    SiteDetailsCardsComponent,
    CommonTableComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[ChartComponent,NavigationDropdownComponent,ButtomComponent,CommonCardComponent,SiteDetailsCardsComponent,CommonTableComponent]
})
export class SharedModule { }
