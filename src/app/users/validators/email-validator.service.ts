import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const id = control.parent?.get('id')?.value;
    return this.usersService.getUserByEmail(email).pipe(
      map((resp) => {
        if (id) {
          return resp.length === 1 ? null : { existsEmail: true };
        }
        return resp.length === 0 ? null : { existsEmail: true };
      })
    );
  }
}
