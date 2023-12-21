import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-request-support',
  templateUrl: './request-support.component.html',
  styleUrls: ['./request-support.component.scss'],
})
export class RequestSupportComponent implements OnInit {
  request_support_form: any | FormGroup;
  constructor(
    private ngb_modal: NgbModal,
    private active_modal: NgbActiveModal,
    private local_Storage: LocalStorageService,
    private fb: FormBuilder,
    private apis: ApiService
  ) {
    this.request_support_form = this.fb.group({
      device: ['', [Validators.required]],
      support_request: ['', [Validators.required]],
      remote_access: [false],
    });
  }

  deviceData: any = [
    // { viewValue: 'Device 1, Pune', value: '00001UZ1XYETP' },
    // { viewValue: 'Device 2, St. Louis', value: '00001S81KOXLA' },
  ];

  ngOnInit(): void {
    this.getDevices();
  }
  closeModal() {
    this.active_modal.close();
  }

  getDevices() {
    let client_code = this.local_Storage.getFromLocalStorage('client_code');

    let session_token = this.local_Storage.getFromLocalStorage('session_token');
    let session_user = this.local_Storage.getFromLocalStorage('session_user');
  
    let payload = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Device-List',
      clientid:client_code,
      session_token: session_token,
      session_user: session_user,
    };

    this.apis.getDeviceDataFromCloud(payload).subscribe({
      next: (res) => {
        
       this.deviceData = res.device_list.map((record:any)=>{
          return { 
            viewValue: record.name,
            value: record.thing_name,
             
            
           }
        })

      

      },
      error: (error) => {
        console.log('error occurred while fetching device data', error);
      },
    });
  }
  checkIfKeyExists(key: any) {
    if (key != null && key != '') {
      return key;
    } else {
      return 'Unknown';
    }
  }

  createTicket() {
    let session_token = this.local_Storage.getFromLocalStorage('session_token');
    let session_user = this.local_Storage.getFromLocalStorage('session_user');
    let client_code = this.local_Storage.getFromLocalStorage('client_code');
    let username = this.local_Storage.getFromLocalStorage('user_name');
    let formData = this.request_support_form.value;
    console.log(formData);

    let device_name  = this.deviceData.filter((record:any)=>record.value == formData.device )[0].viewValue;
    
    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Ticket-Creation',
      session_token: session_token,
      session_user: session_user,
      client_code: client_code,
      device_name:device_name ,
      thing_name: formData.device,
      request_details: formData.support_request,
      requested_by: username,
      remote_access: formData.remote_access ? 'Yes' :'No',
      remote_access_url: 'http://anydesk.com',
    };

    this.apis.manageTicket(request).subscribe({
      next: (res: any) => {
        console.log(res);
        this.active_modal.close();
        let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
          centered: true,
        });
        modal_ref.componentInstance.alertData = {
          alert_title: 'Success',
          alert_body: res.Msg ? res.Msg : 'Something went wrong.',

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
        console.log('error occurred while creating a support ticket', err);
      },
    });
  }
}
