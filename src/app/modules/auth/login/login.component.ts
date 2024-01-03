import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { CommonAlertComponent } from 'src/app/shared/components/common-alert/common-alert.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { patternValidator } from 'src/app/shared/validators/pattern.validators';
import { VALIDATION_PATTERNS } from 'src/app/shared/validators/validators/pattern.validator';
export interface CustomModalOptions extends NgbModalOptions {
  data?: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform: any;
  isPasswordVisible:any;
  constructor(
    private router: Router,
    private apis: ApiService,
    private fb: FormBuilder,

    private local_storage: LocalStorageService,

    private ngbModal: NgbModal
  ) {
    this.loginform = this.fb.group({
      customer_id: ['', [Validators.required ,patternValidator(VALIDATION_PATTERNS.SINGLE_STRING_WITHOUT_TRAILING_LEADING_SPACES.PATTERN,VALIDATION_PATTERNS.SINGLE_STRING_WITHOUT_TRAILING_LEADING_SPACES.VALIDATION_MSG)]],
      user_id: ['', [Validators.required,patternValidator(VALIDATION_PATTERNS.SPACE_TRAILING_LEADING.PATTERN,VALIDATION_PATTERNS.SINGLE_STRING_WITHOUT_TRAILING_LEADING_SPACES.VALIDATION_MSG),patternValidator(/^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please Enter a valid email.')]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apis.session_expiration_stack = [];
  }

  toggle(){
    if(this.loginform.get('password')?.value !==null && this.loginform.get('password')?.value !== '' ){

      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }


  login() {
    var jsondata = {
      client_code: this.loginform.get('customer_id').value,
      app_name: 'lfc-admin-client',
      function_name: 'System-sign-in',
      username: this.loginform.get('user_id').value,
      password: this.loginform.get('password').value,
    };

    this.apis.login(jsondata).subscribe((res: any) => {
      if (res.Type == 'Success') {
        let session_token = res.session_token;
        let session_user = `${res.User_ID}`;
        let user_name = res.Username;
        let user_roles = res.role_list;

        this.local_storage.setToLocalStorage('user_details', user_roles);
        this.local_storage.setToLocalStorage('session_token', session_token);
        this.local_storage.setToLocalStorage(
          'client_code',
          jsondata.client_code
        );
        // this.local_storage.setToLocalStorage('session_token','EgBYylQQlOWXlrTCCNfJAEiumMtbiVkkyutntWbNIQNcbTvEbqUsaxkcDlcbcitZoTDbRaQwUHvfrnVqtIhXAsAwZZrJtxrrhKwe');
        this.local_storage.setToLocalStorage('session_user', session_user);
        this.local_storage.setToLocalStorage('user_name', user_name);

        console.log(res);
        this.local_storage.setToLocalStorage('user_name', user_name);
        this.router.navigate(['/feature/home']);
      } else {
        let modal_ref = this.ngbModal.open(CommonAlertComponentComponent, {
          centered: true,
        });

        modal_ref.componentInstance.alertData = {
          alert_title: 'Oops',
          alert_body: res.Msg,

          alert_actions: [
            {
              button_name: 'Close',
              type: 1,
              button_value: 1,
            },
          ],
        };
      }
    });
  }
}
