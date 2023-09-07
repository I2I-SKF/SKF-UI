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
  @Output() clickedOverlay = new EventEmitter<any>();
  

  ngOnChanges(){
    console.log(this.opened);
    
  }
  closeSidebar(){
    this.close();
  }
  close(){    
      this.clickedOverlay.emit('overlay clicked');
  }
  
}
