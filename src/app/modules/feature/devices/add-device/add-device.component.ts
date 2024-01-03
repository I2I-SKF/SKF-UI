import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { patternValidator } from '../../../../shared/validators/pattern.validators';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit, OnChanges {
  deviceForm: any;
  timeszones: any;
  devices: any = [];
  countryList: any = [];
  StatesList: any = [];
  timezoneList:any = [];
  device_parent_data: any = [];
  child_device_data: any = [];

  deviceManager:any = [];


  @Input() isEditModeOn = false;
  @Input() device_data: any[] | null = null;
  @Input() statuses:any = null;

  constructor(
    private active_modal: NgbActiveModal,
    private fb: FormBuilder,
    private apis: ApiService,
    private local_storage: LocalStorageService,
    private ngb_modal:NgbModal
  ) {}
  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      enroll_device: ['', [Validators.required]],
      device_name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      timezone: ['', Validators.required],
      device_manager: ['', Validators.required],
      link_child: [false],
      parent_device: [false],
      location: [
        '',
        [
          Validators.required,
          patternValidator(/^[a-zA-Z]+$/, 'Only alphabets are allowed.'),
        ],
      ],
      status:[false]
    });


    console.log('device details initialized ...');
    
    this.getCountryList();
    console.log(this.device_data);
    
    this.device_parent_data = this.device_data?.filter(
      (record: any) => record.Status != 'Activated'
    );

    console.log(this.device_parent_data);
    
    this.getUserList() 
    this.getTimezoneList();
  }

  ngOnChanges(SimpleChanges: SimpleChanges) {
    if (SimpleChanges) {
      console.log(SimpleChanges);

      this.device_parent_data = this.device_data?.filter(
        (record: any) => record.Status != 'Activated'
      );
    }
  }

  onDeviceSelect(data: any) {
    this.deviceForm.get('parent_device').setValue('');
    let selected_device = data.target.value;
    this.child_device_data = this.device_parent_data.filter(
      (record: any) => record.device_id != selected_device
    );
  }


  getUserList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    if(client_code && session_token && session_user){
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Device-Managers',
        clientid: client_code,
        session_token:
        session_token,
        session_user: session_user,
       
      };
      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          this.deviceManager = res.User_List.map((user:any)=>{
            return {
              value:user.user_id,
              viewValue:user.user_name
            }
          })
        },
        error: (err) => {
          console.log(err);
        },
      });
    }


   
  }

  closeModal() {
    this.active_modal.close();
  }
  onCountrySelect(data: any) {
    let selected_country_id = data.target.value;
    this.getStateList(selected_country_id);
  }

  getTimezonesWithOffsets(): { name: string; offset: string }[] {
    const timezones: string[] = moment.tz.names();

    return timezones.map((timezone) => ({
      name: timezone,
      offset: moment.tz(timezone).format('Z'),
    }));
  }
  convertToTimezone(date: Date, timezone: string): Date {
    return moment(date).tz(timezone).toDate();
  }
  cancelButton() {}

  getCountryList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Country-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        this.countryList = res.Country_List.map((country: any) => {
          return {
            value: country.country_id,
            viewValue: country.country_name,
          };
        });
      },
      error: (err) => {},
    });
  }
  getStateList(countryId: any) {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-State-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
      country_id: countryId,
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        this.StatesList = res.State_List.map((state: any) => {
          return {
            value: state.state_id,
            viewValue: state.state_name,
          };
        });
      },
      error: (err) => {},
    });
  }
  getTimezoneList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Timezone-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
     
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        this.timezoneList = res.Timezone_List.map((timezone: any) => {
          return {
            value: timezone.timezone_id,
            viewValue: timezone.timezone_name,
          };
        });
      },
      error: (err) => {},
    });
  }
  

  updateDevice() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    // let creation_status = this.device_parent_data.find((record:any)=>parseInt(record.creation_status) == parseInt(form_data.enroll_device)  )

    let form_data = this.deviceForm.value;

    if (client_code && session_token && session_user) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Update-Device',
        clientid: client_code,
        session_token: session_token,
        session_user: session_user,
        creation_status: this.isEditModeOn ? form_data.status ? 6 : 5 : 5, // if creation status is available in the device list then will send that , if not then will send id 5
        name: form_data.device_name,
        country_id: parseInt(form_data.country),
        state_id: parseInt( form_data.state),
        location: form_data.location,
        timezone_id:  parseInt(form_data.timezone),
        manager_id:  parseInt(form_data.device_manager),
        parent_device_id: form_data.link_child ? form_data.parent_device ? form_data.parent_device : null : null ,
        device_id: parseInt(form_data.enroll_device),
        
      };

      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          if(res.Type = 'Success'){
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });
    
            modal_ref.componentInstance.alertData = {
              alert_title: 'Success',
              alert_body: res.Msg?res.Msg:'Something went wrong.',
    
              alert_actions: [
                {
                  button_name: 'Close',
                  type: 1,
                  button_value: 1,
                },
              ],
            };
          }
          else{
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });
    
            modal_ref.componentInstance.alertData = {
              alert_title: 'Oops',
              alert_body: res.Msg?res.Msg:'Something went wrong.',
    
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
          console.log('error occurred while updation device');
          
        },
      });
    }
  }
}
