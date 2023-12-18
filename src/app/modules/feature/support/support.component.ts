import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { RequestSupportComponent } from './request-support/request-support.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  displayed_columns:any[] = [
    "Ticket ID",
    "Device ID",
    "Date Created",
    "Support Request",
    "Remote Access",
    "Status",
    "Resolution",
    "Date Closed"
  ]
  request_data = [
    {
      value:3,viewValue:3
    },
    {
      value:6,viewValue:6
    },
  ]

  table_data:any[] = [
    {
      "Ticket ID":1,
      "Device ID":"AA1001",
    "Date Created":"27/10/23",
    "Support Request":"Some Text Here",
    "Remote Access":"No",
    "Status":"Pending",
    "Date Closed":"-",
    "Resolution":"Some Text here",
    },
    {
      "Ticket ID":2,
      "Device ID":"BB1002",
    "Date Created":"25/10/23",
    "Support Request":"Some Text Here",
    "Remote Access":"Yes",
    "Status":"In Progress",
    "Date Closed":"-",
    "Resolution":"Some Text here",
    },
    {
      "Ticket ID":3,
      "Device ID":"CC1003",
    "Date Created":"23/10/23",
    "Support Request":"Some Text Here",
    "Remote Access":"Yes",
    "Status":"Resolved",
    "Date Closed":"-",
    "Resolution":"Some Text here",
    },
    {
      "Ticket ID":4,
      "Device ID":"DD1004",
    "Date Created":"22/10/23",
    "Support Request":"Some Text Here",
    "Remote Access":"Yes",
    "Status":"Closed",
    "Date Closed":"23/10/23",
    "Resolution":"Some Text here",
    },
  ] 

  dispensesForm:any;
  devices_data = [
    { viewValue: 'Device 1, Pune', value: '00001UZ1XYETP' },
    { viewValue: 'Device 2, St. Louis', value: '00001S81KOXLA' },
  ];


  constructor(private breadcrumbService:BreadcrumbService,private ngbmodal:NgbModal,private fb:FormBuilder){

  }
  ngOnInit():void{
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/feature/home'
      },
     
      {
        name:'Support',
        link:''
      },
     
    ]);
    let date = new Date();
    this.dispensesForm = this.fb.group({
      devices: [this.devices_data[0].value],
      start_date: [],
      end_date: [],
      request:[3]
      
    });
  }

  rowClick(row:any){
    console.log(row);
  }
  requestSupport(){
      this.ngbmodal.open(RequestSupportComponent,{centered:true})
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  onDeviceChange(event:any){

  }
  startDateChange(event:any){

  }
  endDateChange(event:any){

  }
  getData(){

  }
  onRequestChange(data:any){

  }
}
