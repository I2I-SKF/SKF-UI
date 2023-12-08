import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-common-alert-component',
  templateUrl: './common-alert-component.component.html',
  styleUrls: ['./common-alert-component.component.scss']
})
export class CommonAlertComponentComponent {
  @Input() alertData:any  = {}

  constructor(private active_popup:NgbActiveModal,private apis:ApiService){}

  buttonClicked(button_value:any){
    if(button_value){
      this.active_popup.close('popup_closed');

    }else{
      this.active_popup.close();
    }
  }

  ngOnInit(){
 
  // this.apis.getErrorData().subscribe({
  //   next:(res)=>{
  //    this.alertData = res
      
  //   }
  // })
  
  }
}
