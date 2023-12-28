import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  displayed_columns = [
   "Date & Time",
   "Device Name",
   "Location",
   "Alert Type",
   "Description"
  ];
  alerts_form:any;
 
  
  devices_data:any = [
   
  ];

  data = []
  alert_data = [
    {value:3,viewValue:3},
    {value:6,viewValue:6}
  ]

  constructor(private ngbmodal:NgbModal,private breadcrumbs:BreadcrumbService,private fb:FormBuilder,private apis:ApiService,private local_storage:LocalStorageService){

  }

  ngOnInit(): void {
    this.breadcrumbs.setBreadcrumb([
      {
        name:'Home',
        link:'/feature/home'
      },
      {
        name:'Alerts',
        link:''
      },
     
    ]);
    let date = new Date();
    this.alerts_form = this.fb.group({
      devices: [],
      start_date: [{value:'',disabled:true}],
      end_date: [{value:'',disabled:true}],
      alerts_form_radio:['last_alerts'],
      last_alerts: [3],
     
      
    });
    this.getDevices()
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
  onDeviceChange(data:any){
    this.getAlertsData();
  }
  startDateChange(data:any){

  }
  endDateChange(data:any){

  }

  getAlertsData(){
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let request:any = {
      "app_name": "lfc-admin-client", 
      "clientid": client_code, 
      "thing_name":  this.alerts_form.get('devices')?.value ? this.alerts_form.get('devices').value : null,  
      "from_time":  this.alerts_form.get('start_date')?.value ? this.alerts_form.get('start_date').value + " 00:00:00" : null , 
      "to_time": this.alerts_form.get('end_date')?.value ? this.alerts_form.get('end_date').value + " 11:59:59" : null ,   
      "limit" : this.alerts_form.get('last_alerts')?.value ? this.alerts_form.get('last_alerts')?.value : null
    } 


    if(this.alerts_form.get('alerts_form_radio').value == 'last_alerts'){
      delete request.from_time;
      delete request.to_time;
     }
     else{
     delete request.limit;
     }

    this.apis.manageAlerts(request).subscribe({
      next:(res)=>{
        if(res.Type='Success'){

          this.data = res.result_list.map((alert:any)=>{
            return {
              "Date & Time": alert.alert_ts,
              "Device Name":alert.thing_name,
              "Location":'Unknown',
              "Alert Type":alert.alert_type,
              "Description":alert.description,
              "alert_time":alert.alert_ts
            
            }
          })


        }
        else{
          let modal_ref = this.ngbmodal.open(CommonAlertComponentComponent,{centered:true});

        
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
      error:(err)=>{
        
      }
    })

    

  }

  onAlertChange(data:any){

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
            api_data:record,
            device_id: record.device_id,
            value:this.checkIfKeyExists(record.thing_name),
            viewValue: this.checkIfKeyExists(record.name),
            thing_name:this.checkIfKeyExists(record.thing_name) 
          };
        });

        if(this.devices_data.length >0){
          this.alerts_form.get('devices').setValue(this.devices_data[0].value)
          
        }
        this.getAlertsData()
       
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
  onFilterGroupChange(data:any){
      let selected_option  = data.target.value;
      this.alerts_form.get('last_alerts').setValue("");
      this.alerts_form.get('start_date').setValue("");
      this.alerts_form.get('end_date').setValue("");
      this.alerts_form.get('last_alerts').enable();
      this.alerts_form.get('start_date').enable();
      this.alerts_form.get('end_date').enable();
      
      if(selected_option == 'dates'){
        this.alerts_form.get('last_alerts').disable();
        this.alerts_form.get('last_alerts').setValue("");
      }
      else{
        this.alerts_form.get('start_date').disable();
        this.alerts_form.get('end_date').disable();
      }


  }
 

}
