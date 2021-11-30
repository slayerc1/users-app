import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  user!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.usersService.getUser(id)))
      .subscribe((user) => (this.user = user));
  }

  back() {
    history.back();
  }
}
