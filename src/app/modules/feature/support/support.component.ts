import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { RequestSupportComponent } from './request-support/request-support.component';

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


  constructor(private breadcrumbService:BreadcrumbService,private dialog:Dialog){

  }
  ngOnInit():void{
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/home'
      },
     
      {
        name:'Support',
        link:''
      },
     
    ]);
  }

  rowClick(row:any){
    console.log(row);
  }
  requestSupport(){
      this.dialog.open(RequestSupportComponent,{
        
      })
  }
}
