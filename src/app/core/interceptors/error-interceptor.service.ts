import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {  HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private toaster:ToastService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        
        this.toaster.show(error.message,{ classname: 'bg-danger text-light', delay: 5000})
       
       return throwError(()=>error);
      })
    );
  }
}
