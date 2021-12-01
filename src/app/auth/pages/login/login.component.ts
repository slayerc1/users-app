import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../users/services/users.service';

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
    private usersService: UsersService,
    private router: Router
  ) {}

  login() {
    this.authService
      .login(
        this.formGroup.get('username')?.value,
        this.formGroup.get('password')?.value
      )
      .subscribe((user) => {
        if (user.id) {
          // Update last logging, this would be implemented in the backend
          const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
          const localISOTime = new Date(Date.now() - tzoffset)
            .toISOString()
            .slice(0, -1);
          user.lastLogging = localISOTime;
          this.usersService.updateUser(user).subscribe(() => {
            this.router.navigate(['./users']);
          });
        }
      });
  }
}
