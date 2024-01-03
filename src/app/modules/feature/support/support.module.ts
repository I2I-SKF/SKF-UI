
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { RequestSupportComponent } from './request-support/request-support.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SupportComponent } from './support.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentHistoryComponent } from './comment-history/comment-history.component';


@NgModule({
  declarations: [
    RequestSupportComponent,
    SupportComponent,
    CommentHistoryComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    MatDialogModule,SharedModule,
    ReactiveFormsModule
  ]
})
export class SupportModule { }
