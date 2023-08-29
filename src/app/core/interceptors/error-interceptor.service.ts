import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {  HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private _snackBar: MatSnackBar) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        

        this._snackBar.open(error.message,'close',{duration:3000,horizontalPosition: 'right',
          verticalPosition: 'top'});
       return throwError(()=>error);
      })
    );
  }
}
