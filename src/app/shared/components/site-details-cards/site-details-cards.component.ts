import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-site-details-cards',
  templateUrl: './site-details-cards.component.html',
  styleUrls: ['./site-details-cards.component.scss']
})
export class SiteDetailsCardsComponent {
  @Input() chartOptions:any;


}
