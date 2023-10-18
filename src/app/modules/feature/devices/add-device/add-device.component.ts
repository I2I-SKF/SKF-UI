import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit{
deviceForm:FormGroup;
constructor(private fb:FormBuilder,private breadcrumb:BreadcrumbService){
  this.deviceForm = this.fb.group({
    hardware:['',Validators.required],
    location:['',Validators.required],
    dispense_sites:['',Validators.required],
    pin:['',Validators.required],
    remote_access:['',Validators.required],
    lfc:['',Validators.required],
  })
}
ngOnInit(): void {
  console.log('device details initialized ...');
  
}
}
