import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal, NgbModule, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutsModule } from './layouts/layouts.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './core/interceptors/loader-interceptor';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    RouterModule,
    MatSnackBarModule,
    LayoutsModule,
    MatButtonModule,
    NgbToastModule,
    NgbToast,
    SharedModule,
    NgxSpinnerModule,
    
    
    
 
    
  
   
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
   
    
      
     
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true,
      },
     
  


   
  
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule { }
