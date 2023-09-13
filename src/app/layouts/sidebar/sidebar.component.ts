import { Component,EventEmitter,Input,OnChanges, Output } from '@angular/core';
import { NAVIGATION } from '../constants/navigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges  {
  userPermissions = ['user'];
  get filteredNavigationLinks() {
    return NAVIGATION.filter((link:any) => this.userPermissions.includes(link.requiredPermission));
  }
  @Input() opened = true;
  @Output() linkedClicked = new EventEmitter<any>();
  

  ngOnChanges(){
    console.log(this.opened);
    
  }
  closeSidebar(){
    this.linkedClicked.emit('linked clicked');
    

  }
  close(){    
      this.linkedClicked.emit('overlay clicked');
  }
  
}
