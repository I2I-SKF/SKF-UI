import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  viewportWidth: number = window.innerWidth;
  sidebarVisible= false;
  isSidebarOpened = true;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.viewportWidth = event.target.innerWidth;
   
    if(this.viewportWidth >= 1018){
      this.sidebarVisible = false;
    }
    else{
      this.sidebarVisible = true;
    }
    
    localStorage.setItem('iSV',JSON.stringify(this.sidebarVisible));
  }
  checkIfMenuPressed(evnt:any){
   
    this.isSidebarOpened = !this.isSidebarOpened;
    
    
  }
  ngOnInit(): void {
    if(localStorage.getItem('iSV')){
      this.sidebarVisible =localStorage.getItem('iSV') == 'true' ? true :false;
    }
  }

  

 
  
}
