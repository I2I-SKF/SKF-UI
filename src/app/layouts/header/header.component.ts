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

  get filteredNavigationLinks() {
    return NAVIGATION.filter((link:any) => this.userPermissions.includes(link.requiredPermission));
  }
  siteOptionChanged(event:any){
    console.log(event);
    this.router.navigate(['/site-details'])
    
    
  }
  toggleSideNav(){
    console.log('event emitted');
    
    this.toggleSideBar.emit(this.toggleSideBar)
  }

 

}
 