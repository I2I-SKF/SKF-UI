import { Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import {NAVIGATION} from '../constants/navigation'
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class HeaderComponent {

  constructor(private router:Router){

  }
  @Input() isSidebarOpen = false;
  @Output() toggleSideBar:any =  new EventEmitter<any>();
  userPermissions = ['user'];
  options:any =[
    {value:'all_sites',viewValue:'All Sites'},
    {value:'item2',viewValue:'item 2'},
    {value:'item3',viewValue:'item 3'},
    {value:'item4',viewValue:'item 4'},
   
    
  ]

  get filteredNavigationLinks() {
    return NAVIGATION.filter((link:any) => this.userPermissions.includes(link.requiredPermission));
  }
  siteOptionChanged(event:any){
      console.log(event);
      
     event.value == 'all_sites' ? this.router.navigate(['/home']) :this.router.navigate(['/site-details']);
    
  }
  toggleSideNav(){
    console.log('event emitted');
    
    this.toggleSideBar.emit(this.toggleSideBar)
  }

 

}
 