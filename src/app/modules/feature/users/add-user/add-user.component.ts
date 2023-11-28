import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(private active_modal: NgbActiveModal){

  }
  rowClick(){

  }
  closeModal(){
    this.active_modal.close();
  }
}
