import { Component,EventEmitter,Input,OnChanges, OnInit, Output } from '@angular/core';
import { NAVIGATION } from '../constants/navigation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges  {

  userPermissions:any = null;
  filteredNavigationLinks:any;
 
  @Input() opened = true;
  @Output() linkedClicked = new EventEmitter<any>();
  
  constructor(private ngbmodal:NgbModal,private local_storage:LocalStorageService,private router:Router){

  }

  ngOnChanges(){
    console.log(this.opened);
    
  }
  ngOnInit(): void {
    if(this.local_storage.getFromLocalStorage('user_details')){
      this.userPermissions =this.local_storage.getFromLocalStorage('user_details')?.split(",")

      
      this.filteredNavigationLinks = NAVIGATION.filter((link:any) =>  {
        
        const set1 = new Set(this.userPermissions);
  
        
        for (const value of link.requiredPermission) {
          if (set1.has(value)) {
            return true; // Common value found
          }
        }
      
        return false; // No common value found
        
      
      })


    }
    else{
      let modal_ref = this.ngbmodal.open(CommonAlertComponentComponent,{centered:true});
      modal_ref.componentInstance.alertData = {
        alert_title: 'Error',
        alert_body: 'User role not found!',
  

        alert_actions: [
          {
            button_name: 'Close',
            type: 1,
            button_value: 1,
          },
        ],
      };


      modal_ref.result.then(result=>{
        this.router.navigate(['/'])
      })
    }
  }
  closeSidebar(){
    this.linkedClicked.emit('linked clicked');
    

  }
  close(){    
      this.linkedClicked.emit('overlay clicked');
  }
  
}
