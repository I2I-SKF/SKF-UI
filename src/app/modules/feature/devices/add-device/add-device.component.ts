import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {
deviceForm:FormGroup;
constructor(private fb:FormBuilder){
  this.deviceForm = this.fb.group({
    hardware:['',Validators.required],
    location:['',Validators.required],
    dispense_sites:['',Validators.required],
    pin:['',Validators.required],
    remote_access:['',Validators.required],
    lfc:['',Validators.required],
  })
}
}
