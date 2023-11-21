import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-support',
  templateUrl: './request-support.component.html',
  styleUrls: ['./request-support.component.scss']
})
export class RequestSupportComponent implements OnInit {

  constructor(private modalRef:MatDialogRef<RequestSupportComponent>){

    
  }
  
  ngOnInit(): void {
    
  }
  closeModal(){
    this.modalRef.close("");
  }

  


}
