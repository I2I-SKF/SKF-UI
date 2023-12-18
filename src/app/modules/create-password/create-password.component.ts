import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';

import { patternValidator,VALIDATION_PATTERNS } from '../../shared/validators/validators/pattern.validator';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';



@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  userPassword:any;
  confirmPassword:any;
  message:any;
  colorName = "primary"
  confirmPasswordMessage:any;
  disableSubmit = true
  showLoader = false
  successMsg = "Password Updated"
  ErrorMsg:any;
  clienturl:any;
  setPasswordForm:any;
  areWeResettingThePassword = false;
  isPasswordVisible:any = false;
  constructor(private fb:FormBuilder,private router: Router, private apicall: ApiService,private ngbmodal:NgbModal) { }

  ngOnInit(): void {
    
    this.areWeResettingThePassword = this.apicall.areWeResetting;
    
    this.setPasswordForm = this.fb.group({
      client_code:[this.apicall.client_code,[Validators.required]],
      password:['',[Validators.required,patternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must meet the following criteria:\n" +
      "- At least one lowercase letter\n" +
      "- At least one uppercase letter\n" +
      "- At least one digit\n" +
      "- At least one special character (@, $, !, %, *, ?, or &)\n" +
      "- Minimum length of 8 characters")]],
      password_confirm:['',[Validators.required,patternValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must meet the following criteria:\n" +
      "- At least one lowercase letter\n" +
      "- At least one uppercase letter\n" +
      "- At least one digit\n" +
      "- At least one special character (@, $, !, %, *, ?, or &)\n" +
      "- Minimum length of 8 characters")]],
    })
  }
  //This function check password format.
  checkPasswordFormat(event: any) {

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(event.target.value)) {
      this.message = ""
    }
    else {
      this.colorName = "danger"
      this.message = "Password must contain at least one uppercase letter, one lowercase letter, one number ,one special character and having minimum eight characters"
    }
  }

  // this function match password string.
  matchPassword(event: any) {

    if (this.userPassword === event.target.value) {
      this.colorName = "primary"
      this.confirmPasswordMessage = "Password Match"
      this.disableSubmit = false
    }
    else {
      this.colorName = "danger"
      this.confirmPasswordMessage = "Password Not Match"
    }
  }

  updatePassword() {
    this.isPasswordVisible = false;
    
    console.log('client code from set password',this.apicall.client_code);
    
  
    var clienturl=window.location.host

    var jsondata = {
      "app_name":this.apicall.appname,
      "function_name":"Update-Password",
      "user_id":this.apicall.UserId,
      "user_password":this.setPasswordForm.get('password_confirm').value,
      "token":this.apicall.token,
      "client_code":this.apicall.client_code

    }
    this.apicall.managePasswords_ValidateToken(jsondata).subscribe((res: any) => {
      if (res["errorMessage"]) {
        this.showLoader = false
        this.ErrorMsg = "something went wrong"

      }
     else if(res["Code"]=="DataUpdate"){
        this.showLoader = false
        

        let modal_ref = this.ngbmodal.open(CommonAlertComponentComponent,{centered:true});

        
        modal_ref.componentInstance.alertData = {
          alert_title: 'Success!',
          alert_body: this.successMsg,
    
  
          alert_actions: [
            {
              button_name: 'Close',
              type: 1,
              button_value: 1,
            },
          ],
        };

     

       
        this.router.navigate(["/login"])

      }

      else if(res["Code"]=="UserIdEmpty" || res["Code"]=="UsernamePasswordEmpty" || res["Code"]=="UserNotExist" || res["Code"]=="MandatoryInputFieldsMissing" || res["Code"]=="KeyError" || res["Code"]=="Exception"){
        this.showLoader = false
        this.ErrorMsg=res["Msg"]
      }
      else{
        this.showLoader = false
        this.ErrorMsg = res["Msg"]
      }
    })
  }

  toggle(){
    if(this.setPasswordForm.get('password')?.value !==null && this.setPasswordForm.get('password')?.value !== '' ){

      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
 
}
