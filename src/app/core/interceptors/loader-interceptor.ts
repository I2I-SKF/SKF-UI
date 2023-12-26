import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner'; // Import the spinner service
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';




@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private apis:ApiService
  
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    this.apis.pushIntoStack();
    if(this.apis.getStackLength() > 0){
      this.spinner.show();
    }
    else{
      this.spinner.hide();
    }

    return next.handle(request).pipe(
      finalize(() => {
        console.log('!.. loader_showing ');
        this.apis.popFromStack();
        if(this.apis.getStackLength() > 0){
          this.spinner.show();
        }
        else{
          this.spinner.hide();
        }
       

        
       
      })
    );
  }
}

