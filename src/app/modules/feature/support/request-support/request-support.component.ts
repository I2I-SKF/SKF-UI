import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-support',
  templateUrl: './request-support.component.html',
  styleUrls: ['./request-support.component.scss']
})
export class RequestSupportComponent implements OnInit {

  constructor(private active_modal:NgbActiveModal){

    
  }

  deviceData:any = [ { viewValue: 'Device 1, Pune', value: '00001UZ1XYETP' },
  { viewValue: 'Device 2, St. Louis', value: '00001S81KOXLA' },]
  
  ngOnInit(): void {
    
  }
  closeModal(){
    this.active_modal.close();
  }

  


}
