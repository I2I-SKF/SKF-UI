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
 