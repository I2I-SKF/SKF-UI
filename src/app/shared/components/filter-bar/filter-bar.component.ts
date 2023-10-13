import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Input() controlConfig: any[] = []; // Input from the parent component
  @Input() component_details: any = {}; // Input from the parent component
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.addControls();
  }

  addControls() {
    this.controlConfig.forEach((control) => {
      this.form.addControl(control.name, new FormControl(control.value));

    });
  }

  searchEvent(data:any){
    console.log(data);
    
  }
}

