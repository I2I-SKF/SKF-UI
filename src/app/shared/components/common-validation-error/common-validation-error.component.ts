import { Component,Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-common-validation-error',
  templateUrl: './common-validation-error.component.html',
  styleUrls: ['./common-validation-error.component.scss']
})
export class CommonValidationErrorComponent {
  @Input() Control!: AbstractControl ;
  
  getErrorMessages(): string[] {
    const errorMessages: string[] = [];

    if (this.Control?.errors) {
      for (const key of Object.keys(this.Control.errors)) {
        const message = this.getError(key, this.Control.errors[key]);
        errorMessages.push(message);
      }
    }

    return errorMessages;
  }

  private getError(key: string, value: any): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      pattern: value,
     
    };

    return errorMessages[key] || 'Invalid field';
  }
}
