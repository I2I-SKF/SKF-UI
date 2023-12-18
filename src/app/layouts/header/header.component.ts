import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {NAVIGATION} from '../constants/navigation'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router,private local_storage:LocalStorageService){

  }
  @Input() isSidebarOpen = false;
  @Output() toggleSideBar:any =  new EventEmitter<any>();
  userPermissions = ['user'];
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

  get filteredNavigationLinks() {
    return NAVIGATION.filter((link:any) => this.userPermissions.includes(link.requiredPermission));
  }

  ngOnInit(){
    this.username = this.local_storage.getFromLocalStorage('user_name')
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
 