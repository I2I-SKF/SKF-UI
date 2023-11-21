import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(private modalRef:MatDialogRef<AddUserComponent>){

  }
  rowClick(){

  }
  closeModal(){
    this.modalRef.close("");
  }
}
