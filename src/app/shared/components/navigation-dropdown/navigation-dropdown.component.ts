import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-dropdown',
  templateUrl: './navigation-dropdown.component.html',
  styleUrls: ['./navigation-dropdown.component.scss']
})
export class NavigationDropdownComponent {
  isDropdownExpanded:any;
  selected_item:any;
  @Output() select_option = new EventEmitter<String>();
  @Input() icon:String='';
  @Input() placeholder:any = 'Select';
  @Input() options:any =[
    {value:'item1',viewValue:'item 1'},
    {value:'item2',viewValue:'item 2'},
    {value:'item3',viewValue:'item 3'},
    {value:'item4',viewValue:'item 4'},
   
    
  ];
  toggleDropdown(){
   
      this.isDropdownExpanded = !this.isDropdownExpanded;

  }
  selected(option:any){
    let selected_data :any[]= this.options.filter((data:any)=>data.value==option);
    if(selected_data.length > 0){
      this.selected_item = selected_data[0];
      this.select_option.emit(this.selected_item)
    }

    
  }
  focusOut(){
    this.isDropdownExpanded = false;
  }
}
