import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  formGroup: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService
      .login(
        this.formGroup.get('username')?.value,
        this.formGroup.get('password')?.value
      )
      .subscribe((resp) => {
        if (resp[0].id) {
          this.router.navigate(['./users']);
        }
      });
  }
}
