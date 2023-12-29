import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { DevicesService } from '../devices.service';
import {
  FormBuilder,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { patternValidator } from 'src/app/shared/validators/pattern.validators';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  VALIDATION_PATTERNS,
  trimString,
} from 'src/app/shared/validators/validators/pattern.validator';

@Component({
  selector: 'app-device-actions',
  templateUrl: './device-actions.component.html',
  styleUrls: ['./device-actions.component.scss'],
})
export class DeviceActionsComponent implements OnInit, OnDestroy {
  table_actions = [
    { value: 1, viewValue: 'Take Backup' },
    { value: 2, viewValue: 'Download Backup' },
    { value: 4, viewValue: 'Update Enterprise' },
    { value: 5, viewValue: 'Update Agent' },
    { value: 6, viewValue: 'Update QDA' },
    { value: 7, viewValue: 'Lock Device' },
    { value: 8, viewValue: 'Delete Device', isDisabled: true },
  ];
  deviceForm: any | FormGroup;
  StatesList: any;
  timezoneList: any;
  deviceManager: any;
  parent_device_data: any;
  isEditModeOn = false;
  device_parent_data: any;
  device_data: any;
  deviceRecentActions: any = {
    UpdateAgent: 'Unknown',
    UpdateEnterprise: 'Unknown',
    UpdateQDA: 'Unknown',
    TakeBackUp: 'Unknown',
  };
  constructor(
    private ngb_modal: NgbModal,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private device_service: DevicesService,
    private fb: FormBuilder,
    private local_storage: LocalStorageService,
    private apis: ApiService
  ) {
    this.deviceForm = this.fb.group({
      enroll_device: [''],
      device_name: [
        '',
        [
          Validators.required,
          patternValidator(
            VALIDATION_PATTERNS.ONLY_SPACES.PATTERN,
            VALIDATION_PATTERNS.ONLY_SPACES.VALIDATION_MSG
          ),
        ],
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      timezone: ['', Validators.required],
      device_manager: ['', Validators.required],
      link_child: [false],
      parent_device: [{ value: '', disabled: true }],
      location: [
        '',
        [
          Validators.required,
          patternValidator(
            VALIDATION_PATTERNS.ONLY_APHABETS.PATTERN,
            VALIDATION_PATTERNS.ONLY_APHABETS.VALIDATION_MSG
          ),
          patternValidator(
            VALIDATION_PATTERNS.ONLY_SPACES.PATTERN,
            VALIDATION_PATTERNS.ONLY_SPACES.VALIDATION_MSG
          ),
        ],
      ],
    });
  }

  rowDataSubscription: any = null;
  countryList: any;

  dispense_data = [];
  @Input() rowData: any = null;

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name: 'Home',
        link: '/feature/home',
      },

      {
        name: 'Devices',
        link: '/feature/devices',
      },
      {
        name: 'Device Actions',
        link: '',
      },
    ]);

    this.rowDataSubscription = this.device_service.sharedData$.subscribe({
      next: (res) => {
        console.log(res);

        if (res == null) {
          this.router.navigate(['/feature/devices']);
          return;
        }

        if (res?.editMode) {
          this.rowData = res.data;
          this.isEditModeOn = true;

          this.deviceForm.patchValue({
            device_name: this.rowData.name,
            country: this.rowData,
            state: this.rowData,
            timezone: this.rowData.timezone_id,
            device_manager: this.rowData.manager,
            link_child: this.rowData.parent_device_id ? true : false,
            parent_device: '',
            location: this.rowData.location,
          });

          this.getCountryList(this.rowData.country_id, this.rowData.state_id);
          this.getDeviceActionHistory();

          if (this.rowData.parent_device_id) {
            this.deviceForm.get('parent_device').enable();
          }
        } else {
          this.isEditModeOn = false;

          this.device_data = res.data;
          this.device_parent_data = this.device_data?.filter(
            (record: any) => record.Status != 'Activated'
          );

          let control = this.deviceForm.get('enroll_device');
          control.setValidators([Validators.required]);
          control.updateValueAndValidity();
          this.getCountryList();

          this.deviceForm.get('parent_device').disable();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getUserList();
    this.getTimezoneList();
    this.getParentDeviceList();
  }

  CheckConnection() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      action_name: 'CheckConnection',
      session_user: session_user,
      thing_name: this.rowData.thing_name,
      client_id: client_code,
      device_id: this.rowData.device_id,
    };
    this.apis.giveCommandToDevice(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Success',
            alert_body: res.Msg ? res.Msg : 'Request Processed Successfully',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };

          this.getDeviceStatus();
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log('error occurred while giving command.', err);
      },
    });
  }
  getDeviceStatus() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    if (client_code && session_token && session_user) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Device-Status',
        clientid: client_code,
        session_token: session_token,
        session_user: session_user,
        device_id: this.rowData.device_id,
      };

      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          if (res.Type == 'Success') {
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Success',
              alert_body: res.device_status
                ? 'Device Status: ' + res.device_status
                : 'Request Processed Successfully',

              alert_actions: [
                {
                  button_name: 'Close',
                  type: 1,
                  button_value: 1,
                },
              ],
            };
          } else {
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Oops',
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
          console.log('error occurred while updation device');
        },
      });
    }
  }

  onParentLink(data: any) {
    if (this.deviceForm.get('link_child').value) {
      this.deviceForm.get('parent_device').enable();
      this.deviceForm.get('parent_device').setValidators([Validators.required]);
      this.deviceForm.get('parent_device').updateValueAndValidity();
    } else {
      this.deviceForm.get('parent_device').setValue('');
      this.deviceForm.get('parent_device').disable();
      this.deviceForm.get('parent_device')?.clearValidators();
      this.deviceForm.get('parent_device').updateValueAndValidity();
    }
  }

  onDeviceSelect(data: any) {
    let selected_device = data.target.value;
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
        if ((res.Type = 'Success')) {
          this.timezoneList = res.Timezone_List.map((timezone: any) => {
            return {
              value: timezone.timezone_id,
              viewValue: timezone.timezone_name,
            };
          });
        } else {
          this.router.navigate(['/feature/devices']);
        }
      },
      error: (err) => {
        this.router.navigate(['/feature/devices']);
      },
    });
  }
  getUserList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    if (client_code && session_token && session_user) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Device-Managers',
        clientid: client_code,
        session_token: session_token,
        session_user: session_user,
      };
      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          if (res.Type == 'Success') {
            console.log(res);
            this.deviceManager = res.User_List.map((user: any) => {
              return {
                value: user.user_id,
                viewValue: user.user_name,
              };
            });
          } else {
            this.router.navigate(['/feature/devices']);
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Error',
              alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
          this.router.navigate(['/feature/devices']);
        },
      });
    }
  }
  getParentDeviceList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    if (client_code && session_token && session_user) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Parent-Device-List',
        clientid: client_code,
        session_token: session_token,
        session_user: session_user,
      };
      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          if (res.Type == 'Success') {
            if (res.device_list && res.device_list.length > 0) {
              this.parent_device_data = res.device_list.map((device: any) => {
                return {
                  value: device.device_id,
                  viewValue: device.name,
                };
              });
            }
          } else {
            this.router.navigate(['/feature/devices']);
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Error',
              alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
          this.router.navigate(['/feature/devices']);
        },
      });
    }
  }
  onCountrySelect(data: any) {
    let selected_country_id = data.target.value;
    this.getStateList(selected_country_id);
  }

  getCountryList(selectedCountry = null, selectedState = null) {
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
        if (res.Type == 'Success') {
          this.countryList = res.Country_List.map((country: any) => {
            return {
              value: country.country_id,
              viewValue: country.country_name,
            };
          });

          if (selectedCountry) {
            this.deviceForm.get('country').setValue(selectedCountry);
            this.getStateList(selectedCountry, selectedState);
          }
        } else {
          this.router.navigate(['/feature/devices']);
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
      error: (err: any) => {
        this.router.navigate(['/feature/devices']);
      },
    });
  }
  getStateList(countryId: any, selectedState = null) {
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
        if ((res.Type = 'Success')) {
          this.StatesList = res.State_List.map((state: any) => {
            return {
              value: state.state_id,
              viewValue: state.state_name,
            };
          });

          if (selectedState) {
            this.deviceForm.get('state').setValue(selectedState);
          }
        } else {
          this.router.navigate(['/feature/devices']);
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        this.router.navigate(['/feature/devices']);
      },
    });
  }
  ngOnDestroy(): void {
    this.rowDataSubscription.unsubscribe();
    this.device_service.setSharedData(null);
  }

  AddDevice() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    // let creation_status = this.device_parent_data.find((record:any)=>parseInt(record.creation_status) == parseInt(form_data.enroll_device)  )

    let form_data = this.deviceForm.value;

    if (client_code && session_token && session_user && this.deviceForm.valid) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Update-Device',
        clientid: client_code,
        session_token: session_token,
        session_user: session_user,
        creation_status: this.isEditModeOn ? (form_data.status ? 6 : 5) : 5, // if creation status is available in the device list then will send that , if not then will send id 5
        name: trimString(form_data.device_name),
        country_id: parseInt(form_data.country),
        state_id: parseInt(form_data.state),
        location: trimString(form_data.location),
        timezone_id: parseInt(form_data.timezone),
        manager_id: parseInt(form_data.device_manager),
        parent_device_id: form_data.link_child
          ? form_data.parent_device
            ? form_data.parent_device
            : null
          : null,
        device_id: parseInt(form_data.enroll_device),
      };

      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          if (res.Type == 'Success') {
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
            modal_ref.close((result: any) => {
              this.router.navigate(['/feature/devices']);
            });
          } else {
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Oops',
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
          console.log('error occurred while updation device');
        },
      });
    }
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
        creation_status: this.isEditModeOn ? (form_data.status ? 6 : 5) : 5, // if creation status is available in the device list then will send that , if not then will send id 5
        name: form_data.device_name,
        country_id: parseInt(form_data.country),
        state_id: parseInt(form_data.state),
        location: form_data.location,
        timezone_id: parseInt(form_data.timezone),
        manager_id: parseInt(form_data.device_manager),
        parent_device_id: form_data.link_child
          ? form_data.parent_device
            ? form_data.parent_device
            : null
          : null,
        device_id: this.rowData.device_id,
      };

      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          if (res.Type == 'Success') {
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Success',
              alert_body: res.Msg,

              alert_actions: [
                {
                  button_name: 'Close',
                  type: 1,
                  button_value: 1,
                },
              ],
            };
          } else {
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });

            modal_ref.componentInstance.alertData = {
              alert_title: 'Error',
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
          console.log('error occurred while updation device');
        },
      });
    }
  }

  takeBackup() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      // session_token: session_token,
      command: 'TakeBackup',
      app_name: 'lfc-admin-client',
      action_name: 'TakeBackUp',
      session_user: session_user,
      thing_name: this.rowData.thing_name,
      client_id: client_code,
      device_id: this.rowData.device_id,
    };
    this.apis.giveCommandToDevice(request).subscribe({
      next: (res) => {
        console.log(res);
        if (res.Type == 'Success') {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Success',
            alert_body: res.Msg ? res.Msg : 'Request Processed Successfully',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };
          this.getDeviceActionHistory();
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log('error occurred while giving command.', err);
      },
    });
  }
  UpdateAgent() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      action_name: 'UpdateAgent',
      session_user: session_user,
      thing_name: this.rowData.thing_name,
      client_id: client_code,
      device_id: this.rowData.device_id,
    };
    this.apis.giveCommandToDevice(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Success',
            alert_body: res.Msg ? res.Msg : 'Request Processed Successfully',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };
          this.getDeviceActionHistory();
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log('error occurred while giving command.', err);
      },
    });
  }
  UpdateQDA() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      action_name: 'UpdateQDA',
      session_user: session_user,
      thing_name: this.rowData.thing_name,
      client_id: client_code,
      device_id: this.rowData.device_id,
    };
    this.apis.giveCommandToDevice(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Success',
            alert_body: res.Msg ? res.Msg : 'Request Processed Successfully',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };

          this.getDeviceActionHistory();
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log('error occurred while giving command.', err);
      },
    });
  }
  UpdateEnterprize() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      action_name: 'UpdateEnterprise',
      session_user: session_user,
      thing_name: this.rowData.thing_name,
      client_id: client_code,
      device_id: this.rowData.device_id,
    };
    this.apis.giveCommandToDevice(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Success',
            alert_body: res.Msg ? res.Msg : 'Request Processed Successfully',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };

          this.getDeviceActionHistory();
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log('error occurred while giving command.', err);
      },
    });
  }

  convertDate(input_date: any) {
    const inputDateString = input_date;

    // Create a Date object from the input string
    const inputDate = new Date(inputDateString);

    // Get the individual components of the date
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Month is zero-based, so add 1
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const seconds = inputDate.getSeconds();

    // Format the components into the desired format
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${
      month < 10 ? '0' : ''
    }${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  getDeviceActionHistory() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Device-Last-Actions',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
      device_id: this.rowData.device_id,
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          let res_data = res.Action_List;

          let keys = [
            'UpdateAgent',
            'UpdateEnterprise',
            'UpdateQDA',
            'TakeBackUp',
          ];

          keys.forEach((key) => {
            if (res_data[key] && res_data[key].length > 0) {
              this.deviceRecentActions[key] = this.convertDate(
                res_data[key][0]
              );
            }
          });
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log(
          'error occurred while fetching recent device actions.',
          err
        );
      },
    });
  }
  downloadUpdateBackup() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Download-Database-Backup',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
      device_id: this.rowData.device_id,
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          window.open(res.URL, '_blank');
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        console.log(
          'error occurred while fetching recent device actions.',
          err
        );
      },
    });
  }
}
