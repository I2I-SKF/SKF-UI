// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private ngbModal:NgbModal) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap({
            next: (event:any) => {
                if(event?.body?.Code == 'SessionExpired'){
                    
                    localStorage.clear();

                    let modal_ref= this.ngbModal.open(CommonAlertComponentComponent,{centered:true})
                    modal_ref.componentInstance.alertData = {
                        alert_title: 'Session Alert',
                        alert_body: event?.body?.Msg,
                  
                
                        alert_actions: [
                          {
                            button_name: 'Close',
                            type: 1,
                            button_value: 1,
                          },
                        ],
                      };

                    modal_ref.result.then(result=>{
                        this.router.navigate(['/']);
                    })



                   
                }
                else{
                    console.log('session checked...still working');
                    
                }
                
               
           
                
            },
            error: (error) => {
                console.log('from auth err interceptor...',error);

            },
          })
    );
   
  }
}
