
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


export function trimString(string:string){
  if(string && string.length > 0){
    return string.trim();
  }else{
    return string;
  }
}


export const VALIDATION_PATTERNS = {
  EMAIL:{
    PATTERN:/^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    VALIDATION_MSG:'Enter a valid email.'
  },
  PHONE:{
    PATTERN:/^[0-9]{10}$/,
    VALIDATION_MSG:'Enter a valid mobile number.'
  },
  ZIP:{
    PATTERN:/^\d{5}$/,
    VALIDATION_MSG:'Enter a valid ZIP Code.'
  },
  PASSWORD:{
    PATTERN:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    VALIDATION_MSG:"Password must meet the following criteria:\n" +
    "- At least one lowercase letter\n" +
    "- At least one uppercase letter\n" +
    "- At least one digit\n" +
    "- At least one special character (@, $, !, %, *, ?, or &)\n" +
    "- Minimum length of 8 characters"
  },
  ONLY_SPACES:{
    PATTERN:/^.*[^\s].*$/,
    VALIDATION_MSG:'Enter valid input'
  },
  SPACE_TRAILING_LEADING:{
    PATTERN:/^[^\s].*[^\s]$/,
    VALIDATION_MSG:'Leading or trailing white spaces are not allowed'
  },
  SINGLE_STRING_WITHOUT_TRAILING_LEADING_SPACES:{
    PATTERN:/^[^\s]+$/,
    VALIDATION_MSG:'Leading, trailing or spaces in between are not allowed'
  },
  ONLY_APHABETS:{
    PATTERN:/^[A-Za-z\s]+$/,
    VALIDATION_MSG:'Numbers and special symbols are not allowed'
  }
  
  
}
