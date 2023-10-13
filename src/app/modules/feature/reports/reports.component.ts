import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  constructor(private breadcrumbService:BreadcrumbService){}
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/home'
      },
     
      {
        name:'Reports',
        link:''
      },
     
    ]);

  }

}
