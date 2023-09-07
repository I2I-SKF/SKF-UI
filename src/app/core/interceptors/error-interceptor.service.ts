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
    let config:any = {
      
      panelClass:['snakbar_style'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        

        this._snackBar.open(error.message,'close',config);
       return throwError(()=>error);
      })
    );
  }
}
