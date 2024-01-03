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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private ngbModal:NgbModal,private apis:ApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap({
            next: (event:any) => {
                if(event?.body?.Code == 'SessionExpired'){
                  console.log('inside the interceptor');
                  

                    this.apis.pushIntoSessionStack();

                    if(this.apis.getSessionStackLength() ==  1){
                      localStorage.clear();
                      
                      
                      let modal_ref= this.ngbModal.open(CommonAlertComponentComponent,{centered:true,backdrop:'static'})
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

                    


                   
                }
                else{
                    console.log('session checked...still working');
                    
                }
                
               
           
                
            },
            error: (error) => {
              
              let modal_ref = this.ngbModal.open(CommonAlertComponentComponent, {
                centered: true,
              });
  
              modal_ref.componentInstance.alertData = {
                alert_title: 'Error',
                alert_body: error.message ? error.message : 'Something went wrong',
  
                alert_actions: [
                  {
                    button_name: 'Close',
                    type: 1,
                    button_value: 1,
                  },
                ],
              };

            },
          })
    );
   
  }
}
