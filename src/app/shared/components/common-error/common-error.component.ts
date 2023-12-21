import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-common-error',
  templateUrl: './common-error.component.html',
  styleUrls: ['./common-error.component.scss']
})
export class CommonErrorComponent {
  @Input() form_control_name!: FormControl ;

  getErrorMessages(): string[] {
    const errorMessages: string[] = [];

    if (this.form_control_name?.errors) {
      for (const key of Object.keys(this.form_control_name.errors)) {
        const message = this.getError(key, this.form_control_name.errors[key]);
        errorMessages.push(message);
      }
    }

    return errorMessages;
  }

  private getError(key: string, value: any): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      pattern: value,
      // Add more error messages as needed
    };

    return errorMessages[key] || 'Invalid field';
  }
}
