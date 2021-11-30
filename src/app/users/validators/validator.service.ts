import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  fieldEquals(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;
      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({ noEquals: true });
        return { noEquals: true };
      }

      if (!formGroup.get(field2)?.errors?.required) {
        formGroup.get(field2)?.setErrors(null);
      }
      return null;
    };
  }
}
