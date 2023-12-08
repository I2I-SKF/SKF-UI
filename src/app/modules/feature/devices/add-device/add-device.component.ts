import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { patternValidator } from '../../../../shared/validators/pattern.validators';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],



})
export class AddDeviceComponent implements OnInit{
deviceForm:any;
timeszones:any;
devices:any = [];

constructor(private active_modal: NgbActiveModal,private fb:FormBuilder, private apis: ApiService
  ){
    

 
}
ngOnInit(): void {
  this.deviceForm = this.fb.group({
    hardware:['',[Validators.required]],
    device:['',[Validators.required]],
    country:['',[Validators.required]],
    state:['',[Validators.required]],
    timezone:['',Validators.required],
    device_manager:['',Validators.required],
    link_child:[''],
    parent_device:[''],
    location:['',[Validators.required,patternValidator(/^[a-zA-Z]+$/,'Only alphabets are allowed.')]],
   
  })
  console.log('device details initialized ...');
  this.timeszones = this.getTimezonesWithOffsets();

  this.getDevices();
 
  

}

closeModal(){
  
 this.active_modal.close();
  
}

getDevices() {
  let payload = {
    function_name: 'Get-Device-List',
    clientid: '1',
  };

  this.apis.getDeviceDataFromCloud(payload).subscribe({
    next: (res) => {

      
      
      res.device_list.forEach((record:any)=>{
        if(record.name){
          this.devices.push(record)}
       
      })
      console.log(this.devices);
      
    },
    error: (error) => {
      console.log('error occurred while fetching device data', error);
    },
  });
}
getTimezonesWithOffsets(): { name: string; offset: string }[] {
  const timezones: string[] = moment.tz.names();
  
  return timezones.map(timezone => ({
    name: timezone,
    offset: moment.tz(timezone).format('Z'),
  }));
}
convertToTimezone(date: Date, timezone: string): Date {
  return moment(date).tz(timezone).toDate();
}
cancelButton(){

}
}
