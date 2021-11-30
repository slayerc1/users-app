import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { User } from '../../interfaces/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  myControl = this.fb.control(null);
  users: User[] = [];
  userSelected: User | undefined;

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  searchUser() {
    if (this.myControl.value.length > 0) {
      this.usersService
        .searchUsers(this.myControl.value)
        .subscribe((users) => (this.users = users));
    } else {
      this.users = [];
      this.userSelected = undefined;
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const userValue: User = event.option.value;
    if (userValue) {
      this.myControl.setValue(userValue.username);

      this.usersService
        .getUser(userValue.id)
        .subscribe((user) => (this.userSelected = user));
    }
  }
}
