import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;

  constructor() {}

  ngOnInit(): void {}
}
