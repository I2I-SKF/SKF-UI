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




@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
  
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentRoute = this.router.url;

    console.log('loader_showing');
    
    this.spinner.show();

    

    return next.handle(request).pipe(
      finalize(() => {
        console.log('!.. loader_showing ');
        this.spinner.hide();

        
       
      })
    );
  }
}

