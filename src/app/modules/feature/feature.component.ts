import { Component, HostListener, OnInit } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    localStorage.setItem('SS',JSON.stringify(this.isSidebarOpened));
    
    
  }
  constructor(private breadcrumbService:BreadcrumbService){

  }
  ngOnInit(): void {
    this.viewportWidth = window.innerWidth;
    console.log(this.viewportWidth);
    
    if(this.viewportWidth >= 1018){
      this.sidebarVisible = false;
    }
    else{
      this.sidebarVisible = true;
    }
    localStorage.setItem('iSV',JSON.stringify(this.sidebarVisible));


  const customBreadcrumbs = [{name:'Home',link:'/home'}];
  this.breadcrumbService.setBreadcrumb(customBreadcrumbs)
  


    if(localStorage.getItem('iSV')){
      this.sidebarVisible =localStorage.getItem('iSV') == 'true' ? true :false;
      
      
    }
    if(localStorage.getItem('SS')){
      this.isSidebarOpened =localStorage.getItem('SS') == 'true' ? true :false;
     
      
    }
  }

  

 
  
}
