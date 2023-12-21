import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})
export class TankComponent implements OnInit {
 

  tankForm:any;
  devices_data:any =[];
  constructor(private breadcrumb:BreadcrumbService,private fb:FormBuilder,private apis:ApiService,private local_storage:LocalStorageService){
        this.tankForm = this.fb.group({
          devices:['']
        })
  }

  ngOnInit(): void {
    this.breadcrumb.setBreadcrumb([
      {
        name:'Home',
        link:'/feature/home'
      },
     
      {
        name:'Tanks',
        link:''
      },
     
    ])
    this.getDevices();
  }

  onDeviceChange(data:any){

  }

  getDevices() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let payload = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Device-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
    };

    this.apis.getDeviceDataFromCloud(payload).subscribe({
      next: (res) => {
        this.devices_data = res.device_list.map((record: any) => {
          return {
           value:record.device_id,
            viewValue:record.name
          };
        });

        
      },
      error: (error:any) => {
        console.log('error occurred while fetching device data', error);
      },
    });
  }

}
