import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

interface alertData {
  'alert_title'?:String,
  'alert_body'?:String | null,
  'alert_footer'?:String | null,
  'alert_actions'?: alertActions[] 
}

interface alertActions {
  'button_name':String,
  'type':Number,
  'button_value':boolean
  
}

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent {
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
 
  this.apis.getErrorData().subscribe({
    next:(res)=>{
     this.alertData = res
      
    }
  })
  
  }

}
