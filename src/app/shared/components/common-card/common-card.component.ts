import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.scss']
})
export class CommonCardComponent {

  @Input() card_icon:String = ''
  @Input() card_title:String = ''
}
