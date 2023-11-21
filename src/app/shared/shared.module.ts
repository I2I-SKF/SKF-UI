import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './components/chart/chart.component';
import { NavigationDropdownComponent } from './components/navigation-dropdown/navigation-dropdown.component';
import {MatButtonModule} from '@angular/material/button';
import { CommonCardComponent } from './components/common-card/common-card.component';
import { SiteDetailsCardsComponent } from './components/site-details-cards/site-details-cards.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { CommonToasterComponent } from './components/common-toaster/common-toaster.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ChartComponent,
    NavigationDropdownComponent,
    
    CommonCardComponent,
    SiteDetailsCardsComponent,
    CommonTableComponent,
    CommonDialogComponent,
    CommonToasterComponent,
    BreadcrumbComponent,
    FilterBarComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgbToastModule,
    NgbPopoverModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[CommonDialogComponent,ChartComponent,NavigationDropdownComponent,CommonCardComponent,SiteDetailsCardsComponent,CommonTableComponent,CommonToasterComponent,BreadcrumbComponent,FilterBarComponent,ButtonComponent]
})
export class SharedModule { }
