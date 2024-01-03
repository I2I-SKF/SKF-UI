
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function patternValidator(pattern: RegExp, errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; 
    }

    const isValid = pattern.test(control.value);

    return isValid ? null : { pattern: errorMessage };
  };
}
