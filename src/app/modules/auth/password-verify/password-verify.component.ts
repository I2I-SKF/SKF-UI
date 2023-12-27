import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { patternValidator } from 'src/app/shared/validators/pattern.validators';
import { APPLICATION_MSGS } from '../../../shared/constants/MSG';
import { VALIDATION_PATTERNS } from 'src/app/shared/validators/validators/pattern.validator';

@Component({
  selector: 'app-password-verify',
  templateUrl: './password-verify.component.html',
  styleUrls: ['./password-verify.component.scss'],
})
export class PasswordVerifyComponent {
  mail_verification_form: any;
  token_verification_link: any;
  login_url: any;
  constructor(
    private fb: FormBuilder,
    private apis: ApiService,
    private ngbModal: NgbModal
  ) {
    this.mail_verification_form = this.fb.group({
      mail: [
        '',
        [
          Validators.required,
          patternValidator(
            /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please Enter a valid email.'
          ),
        ],
      ],
      client_id: [
        '',
        [
          Validators.required,
          patternValidator(
            VALIDATION_PATTERNS.SPACE_TRAILING_LEADING.PATTERN,
            VALIDATION_PATTERNS.SINGLE_STRING_WITHOUT_TRAILING_LEADING_SPACES
              .VALIDATION_MSG
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.token_verification_link = `${window.location.href.split('/')[0]}//${
      window.location.href.split('/')[2]
    }`;
    this.login_url = `${window.location.href.split('/')[0]}//${
      window.location.href.split('/')[2]
    }/login`;
    console.log(this.token_verification_link, this.login_url);
  }
  onSubmit() {
    let request = {
      app_name: 'lfc-admin-client',
      token_verification_link: this.token_verification_link,
      function_name: 'Reset-Password',
      user_email: this.mail_verification_form.get('mail').value,
      client_code: this.mail_verification_form.get('client_id').value,
    };
    this.apis.validateEmail(request).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.Type = 'Success' && res.token)) {
          this.sendMail(res.token);
        } else {
          console.log('error');
          let modal_ref = this.ngbModal.open(CommonAlertComponentComponent, {
            centered: true,
          });
          modal_ref.componentInstance.alertData = {
            alert_title: 'Oops!',
            alert_body: res.Msg ? res.Msg : 'Something went wrong.',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };
        }
      },
      error: (err) => {
        console.log('error occurred while validating email.', err);
      },
    });
  }

  sendMail(activate_token: any) {
    console.log(activate_token);

    let request = {
      app_name: 'lfc-admin-client',
      mail_type: 'Reset-Password',
      subject: 'Reset Password Request',
      token_verification_link: this.token_verification_link,
      activate_token: activate_token,
      user_email: this.mail_verification_form.get('mail').value,
      client_code: this.mail_verification_form.get('client_id').value,
    };
    this.apis.sendMailAfterMailVerification(request).subscribe({
      next: (res) => {
        console.log(res);
        let modal_ref = this.ngbModal.open(CommonAlertComponentComponent, {
          centered: true,
        });
        modal_ref.componentInstance.alertData = {
          alert_title: APPLICATION_MSGS.REQUEST_SUBMITTED,
          alert_body: res.Msg
            ? APPLICATION_MSGS.MAIL_VERIFICATION
            : 'Something Went Wrong.',

          alert_actions: [
            {
              button_name: 'Close',
              type: 1,
              button_value: 1,
            },
          ],
        };
      },
      error: (err) => {
        console.log('error occurred while sending a mail.', err);
      },
    });
  }

  


}
