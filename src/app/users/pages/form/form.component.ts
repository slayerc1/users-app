import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { EmailValidatorService } from '../../validators/email-validator.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/users.interface';
import { UsernameValidatorService } from '../../validators/username-validator.service';
import { UsersService } from '../../services/users.service';
import { ValidatorService } from '../../validators/validator.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {
  formGroup: FormGroup = this.fb.group(
    {
      id: [null],
      username: [
        null,
        [Validators.required, Validators.minLength(3)],
        [this.usernamevs],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.emailvs],
      ],
      name: [null, [Validators.required]],
      surnames: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      active: [true],
      urlImage: [null],
    },
    {
      validators: [this.vs.fieldEquals('password', 'password2')],
    }
  );

  user: User = {
    id: '',
    username: '',
    name: '',
    surnames: '',
    email: '',
    password: '',
    age: undefined,
    active: true,
    lastLogging: '',
    creationDate: '',
    urlImage: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private usersService: UsersService,
    private vs: ValidatorService,
    private usernamevs: UsernameValidatorService,
    private emailvs: EmailValidatorService
  ) {}

  public get userNameErrorMessage(): string {
    if (this.formGroup.controls.username.hasError('required')) {
      return 'Usernames is required';
    } else if (this.formGroup.controls.username.hasError('existsUsername')) {
      return 'This username already exists';
    } else if (this.formGroup.controls.username.hasError('minlength')) {
      return 'Minimum 3 characters';
    }
    return '';
  }

  public get passwordErrorMessage(): string {
    if (this.formGroup.controls.password.hasError('required')) {
      return 'Password is required';
    } else if (this.formGroup.controls.password.hasError('minlength')) {
      return 'Minimum 6 characters';
    }
    return '';
  }

  public get passwordConfirmErrorMessage(): string {
    if (this.formGroup.controls.password2.hasError('required')) {
      return 'Password confirm is required';
    } else if (this.formGroup.controls.password2.hasError('noEquals')) {
      return 'Passwords do not match';
    }
    return '';
  }

  public get emailErrorMessage(): string {
    if (this.formGroup.controls.email.hasError('required')) {
      return 'Email is required';
    } else if (this.formGroup.controls.email.hasError('existsEmail')) {
      return 'This email already exists';
    } else if (this.formGroup.controls.email.hasError('pattern')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  public get ageErrorMessage(): string {
    if (this.formGroup.controls.age.hasError('required')) {
      return 'Age is required';
    } else if (
      this.formGroup.controls.age.hasError('min') ||
      this.formGroup.controls.age.hasError('max')
    ) {
      return 'Age must be greater than 0 and less than 99';
    }
    return '';
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.usersService.getUser(id)))
      .subscribe((user) => {
        this.formGroup.reset(user);
        this.user = user;
      });
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const user = { ...this.user, ...this.formGroup.value };
    delete user.password2;
    if (user.id) {
      this.usersService
        .updateUser(user)
        .subscribe((resp) => this.showSnackbar('User updated'));
    } else {
      this.usersService.addUser(user).subscribe((resp) => {
        this.router.navigate(['/users/edit', resp.id]);
        this.showSnackbar('User created');
      });
    }
  }

  goBack() {
    history.back();
  }

  delete() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { ...this.user },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService
          .deleteUser(this.user.id)
          .subscribe(() => this.router.navigate(['/users']));
      }
    });
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'ok!', { duration: 2500 });
  }
}
