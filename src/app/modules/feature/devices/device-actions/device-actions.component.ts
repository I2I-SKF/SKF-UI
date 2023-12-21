import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { DevicesService } from '../devices.service';
import { FormBuilder, Validators } from '@angular/forms';
import { patternValidator } from 'src/app/shared/validators/pattern.validators';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-device-actions',
  templateUrl: './device-actions.component.html',
  styleUrls: ['./device-actions.component.scss']
})
export class DeviceActionsComponent implements OnInit, OnDestroy {
  table_actions = [
    { value: 1, viewValue: 'Take Backup' },
    { value: 2, viewValue: 'Download Backup' },
    { value: 4, viewValue: 'Update Enterprise' },
    { value: 5, viewValue: 'Update Agent' },
    { value: 6, viewValue: 'Update QDA' },
    { value: 7, viewValue: 'Lock Device' },
    { value: 8, viewValue: 'Delete Device' ,isDisabled:true },
  ];
  deviceForm:any;
  StatesList:any;
  timezoneList:any;
  deviceManager:any;
  parent_device_data:any;
  constructor(private breadcrumbService:BreadcrumbService,private device_service:DevicesService,private fb:FormBuilder,private local_storage:LocalStorageService,private apis:ApiService){
    this.deviceForm = this.fb.group({
     
      device_name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      timezone: ['', Validators.required],
      device_manager: ['', Validators.required],
      link_child: [false],
      parent_device: [],
      location: [
        '',
        [
          Validators.required,
          ,
        ],
      ],
      // status:[false]
    });
  }

  rowDataSubscription:any = null;
  countryList:any;
  
  dispense_data = []
  @Input() rowData:any = null

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
      next:(res)=>{
        this.rowData = res;
        console.log(res);

        this.deviceForm.patchValue({
          device_name: this.rowData.name,
          country: this.rowData,
          state: this.rowData,
          timezone: this.rowData.timezone_id,
          device_manager: this.rowData.manager,
          link_child: this.rowData.parent_device_id?true:false,
          parent_device: this.rowData.parent_device_id,
          location: this.rowData.location,
          // status:this.rowData.creation_status == 6?true:false
        })
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

    this.getUserList() 
    this.getTimezoneList();
    this.getCountryList();
    this.getParentDeviceList() 



  }
  onParentLink(data:any){
    if(this.deviceForm.get('link_child').value){
      this.deviceForm.get('parent_device').enable();
    }
    else{
      this.deviceForm.get('parent_device').disable();
    }

    
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
  getParentDeviceList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    if(client_code && session_token && session_user){
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Parent-Device-List',
        clientid: client_code,
        session_token:
          session_token,
        session_user: session_user,
       
      };
      this.apis.getDeviceDataFromCloud(request).subscribe({
        next: (res) => {
          console.log(res);
          this.parent_device_data = res.User_List.map((user:any)=>{
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
  onCountrySelect(data: any) {
    let selected_country_id = data.target.value;
    this.getStateList(selected_country_id);
  }

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
      error: (err:any) => {},
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
  ngOnDestroy(): void {
    this.rowDataSubscription.unsubscribe();
  }
  updateDevice(){

  }


}
