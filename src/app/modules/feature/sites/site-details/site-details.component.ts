import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {
  constructor(private breadcrumbService:BreadcrumbService,private route:ActivatedRoute){}
  siteName:any;
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/home',
      },
      {
        name:'Sites',
        link:'/sites',
      },
      {
        name:'Site Details',
        link:'/sites/site-details',
      },
    ]);

    this.siteName = this.route.snapshot.paramMap.get('name');

    

  }

}
