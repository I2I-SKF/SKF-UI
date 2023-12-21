import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http:HttpClient){

    }



    
  // token check variables

  appname = 'lfc-admin-client'
  isTokenCheck:any;
  token:any=null;
  UserId:any=null;
  areWeResetting:any = null;
  client_code = null

  // token check variables end here

    cloud_url = `https://5vvz2ksfs2.execute-api.us-east-1.amazonaws.com/DEV`;

    get_device_data = `https://51je03fxb9.execute-api.us-east-1.amazonaws.com/DEV`;

    login_url = `https://3vivdypon9.execute-api.us-east-1.amazonaws.com/DEV`;

    admin_login_url = `https://xllpctl01j.execute-api.us-east-1.amazonaws.com/DEV`;

    create_validate_token = `https://2rtvpt14x7.execute-api.us-east-1.amazonaws.com/DEV`;

    sendMail = `https://tolsedyvyd.execute-api.us-east-1.amazonaws.com/DEV`;

    validate_email = `https://xllpctl01j.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_ticket = `https://l8o5w6ebm8.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_user = `https://qlft9ivp7f.execute-api.us-east-1.amazonaws.com/DEV`


    error_obj = new BehaviorSubject(null);

    setErrorMsg(data:any){
        this.error_obj.next(data);
    }
    getErrorData(){
        return this.error_obj;
    }

    getDataFromCloud(payload:any):Observable<any>{
        return this.http.post(this.cloud_url, payload);
    }
    getDeviceDataFromCloud(payload:any):Observable<any>{
        return this.http.post(this.get_device_data, payload);
    }


    login(payload:any):Observable<any>{
        return this.http.post(this.admin_login_url,payload);
    }


    managePasswords_ValidateToken(payload:any):Observable<any>{
        return this.http.post(this.create_validate_token,payload);
      } 


      
  sendMailAfterMailVerification(payload:any):Observable<any>{
    return this.http.post(this.sendMail,payload);
  }
  
    
  
  validateEmail(payload:any):Observable<any>{
    return this.http.post(this.validate_email,payload);
  }





  manageTicket(payload:any):Observable<any>{
    return this.http.post(this.manage_ticket,payload);
  }


  manageUser(payload:any):Observable<any>{
    return this.http.post(this.manage_user,payload);
  }






}
