import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
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
  tankData:any;
  devices_data:any =[];
  last_updated_at:any = null;
  constructor(private breadcrumb:BreadcrumbService,private fb:FormBuilder,private apis:ApiService,private local_storage:LocalStorageService,private ngb_modal:NgbModal){
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
    this.getTanksData();
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
        if(res.Type=='Success'){
          this.devices_data = res.device_list.map((record: any) => {
            return {
              api_data:record,
              device_id: record.device_id,
              value:this.checkIfKeyExists(record.thing_name),
              viewValue: this.checkIfKeyExists(record.name),
              thing_name:this.checkIfKeyExists(record.thing_name) 
            };
          });
  
          if(this.devices_data.length >0){
            this.tankForm.get('devices').setValue(this.devices_data[0].value)
            
          }
          
          this.getTanksData() ;
        }
        else{
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went Wrong',

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


  getTanksData() {
    this.tankData = [];
    this.last_updated_at = null;
    let client_code = this.local_storage.getFromLocalStorage('client_code');
   

    let payload = {
      "app_name": "lfc-admin-client",
      "clientid":client_code ,
      "thing_name" : this.tankForm.get('devices').value
    };

    this.apis.manageTanks(payload).subscribe({
      next: (res) => {
       
        if(res.Type=="Success"){
          this.tankData = res.result_list.map((tank:any)=>{
            return {
              tank_name:tank?.tank_name,
              tank_id:tank?.tank_id,
              fluid:tank?.fluid,
              level_monitoring: tank?.level_monitoring ? tank?.level_monitoring == true ? 'On' : 'Off' : 'Unknown',
              last_level:tank?.last_level ? tank?.last_level :'Unknown' ,
              maximum_level:tank?.maximum_level ? tank?.maximum_level : 'Unknown',
              current_level:tank?.current_level ? tank?.current_level : 'Unknown',
              low_warning_level:tank?.low_warning_level ? tank?.low_warning_level:'Unknown',
              tank_stop_level:tank?.tank_stop_level  ? tank?.tank_stop_level : 'Unknown',
              calculated_tank_level: ((tank?.current_level  / tank?.maximum_level ) * 100)
            }
          });
  
          this.last_updated_at =  res?.utctime ? res?.utctime : 'N/A';
        }
        else{
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });

          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went Wrong',

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
      error: (error) => {
        console.log('error occurred while fetching device data', error);
      },
    });
  }

}
