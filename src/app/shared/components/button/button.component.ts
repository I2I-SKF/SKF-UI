import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() button_label:String = 'button Label';
  @Input() isDisabled:Boolean = false;
  @Input() button_config = {
    variant:1,
    icon:false,
    isSmall:false,
    isSecondary:false,
    secondary_type:2
    
  }
  @Output() onClick = new EventEmitter<any>()

  constructor(){

  }

  ngOnInit():void{

  }

  // onButtonClick(event:any){
  //   this.onButtonClick.
  // }


}



// configuration details 

// variant 1 

// primary button 

// variant 2 

// success button (greem)

// variant 3

// destructive button (red)

// variant 4
// link


