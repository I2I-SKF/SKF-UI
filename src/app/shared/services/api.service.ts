import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private http:HttpClient){

    }



  // 
  current_apis_in_progress_stack:any[] = [];

  session_expiration_stack:any = [];


 

  pushIntoSessionStack(){
    this.session_expiration_stack.push('session')
    console.log(this.session_expiration_stack);
    
  }
  popFromSessionStack(){
    if(this.session_expiration_stack.length > 0){
      this.session_expiration_stack.pop();
    }
  }
  getSessionStackLength(){
    return  this.session_expiration_stack.length;
   }



  pushIntoStack(){
    this.current_apis_in_progress_stack.push('Api')
  }
  popFromStack(){
    if(this.current_apis_in_progress_stack.length > 0){
      this.current_apis_in_progress_stack.pop();
    }
  }

  getStackLength(){
   return  this.current_apis_in_progress_stack.length;
  }
    
  // token check variables

  appname = 'lfc-admin-client'
  isTokenCheck:any;
  token:any=null;
  UserId:any=null;
  areWeResetting:any = null;
  client_code = null

  // token check variables end here

    manage_dispenses = `https://5vvz2ksfs2.execute-api.us-east-1.amazonaws.com/DEV`;

    get_device_data = `https://51je03fxb9.execute-api.us-east-1.amazonaws.com/DEV`;

    login_url = `https://3vivdypon9.execute-api.us-east-1.amazonaws.com/DEV`;

    admin_login_url = `https://xllpctl01j.execute-api.us-east-1.amazonaws.com/DEV`;

    create_validate_token = `https://2rtvpt14x7.execute-api.us-east-1.amazonaws.com/DEV`;

    sendMail = `https://tolsedyvyd.execute-api.us-east-1.amazonaws.com/DEV`;

    validate_email = `https://xllpctl01j.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_ticket = `https://l8o5w6ebm8.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_user = `https://qlft9ivp7f.execute-api.us-east-1.amazonaws.com/DEV`;

    command_device_url = `https://44a6atkan2.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_tanks = `https://78jtv9qslf.execute-api.us-east-1.amazonaws.com/DEV`;

    manage_alerts = `https://q22vfomwvg.execute-api.us-east-1.amazonaws.com/DEV`;

    download_agent_installer = `https://dme091pzhf.execute-api.us-east-1.amazonaws.com/DEV/`;




    error_obj = new BehaviorSubject(null);

    setErrorMsg(data:any){
        this.error_obj.next(data);
    }
    getErrorData(){
        return this.error_obj;
    }

    getDispenseData(payload:any):Observable<any>{
        return this.http.post(this.manage_dispenses, payload);
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

  giveCommandToDevice(payload:any):Observable<any>{
    return this.http.post(this.command_device_url,payload)
  }


  manageTanks(payload:any):Observable<any>{
    return this.http.post(this.manage_tanks,payload);
  }


  manageAlerts(payload:any):Observable<any>{
    return this.http.post(this.manage_alerts,payload);
  }

  sendEmail(payload:any):Observable<any>{
    return this.http.post(this.sendMail,payload);
  }

  downloadAgentInstaller():Observable<any>{
    return this.http.post(this.download_agent_installer,{});
  }



}
