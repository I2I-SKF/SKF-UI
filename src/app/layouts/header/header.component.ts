import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {NAVIGATION} from '../constants/navigation'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router,private local_storage:LocalStorageService,private ngbmodal:NgbModal){

  }
  @Input() isSidebarOpen = false;
  @Output() toggleSideBar:any =  new EventEmitter<any>();
  userPermissions:any = null;
  filteredNavigationLinks:any= null
  username:any = null;
  options:any =[
    {value:'all_sites',viewValue:'All Sites'},
    {value:'Sitea',viewValue:'Site A'},
    {value:'item3',viewValue:'Site B'},
    {value:'item4',viewValue:'Site C'},
    {value:'item5',viewValue:'Site D'},
    
  ]
  options_today:any =[
    {value:'today',viewValue:'Today'},
    {value:'last_two_days',viewValue:'Last 2 Days'},
    {value:'last_week',viewValue:'Last Week'},
    {value:'last_month',viewValue:'Last Month'},
    
    
  ]

  

  ngOnInit(){
    this.username = this.local_storage.getFromLocalStorage('user_name')

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
  siteOptionChanged(event:any){
      console.log(event);
      
     event.value == 'all_sites' ? this.router.navigate(['/home']) :this.router.navigate(['/site-details']);
    
  }
  toggleSideNav(){
    console.log('event emitted');
    
    this.toggleSideBar.emit(this.toggleSideBar)
  }

  logout(){
    this.router.navigate(['/login'])
  }
  onNavOptionChange(event:any){
    let data = event.target.value
    if(data == 'logout'){
      this.logout();
    }
  }
 

}
 