import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../users/interfaces/users.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: User | undefined;

  get auth(): User {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<User>(`${this.baseUrl}/users/${token}`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .get<User[]>(
        `${this.baseUrl}/users?username=${username}&password=${password}`
      )
      .pipe(
        map((auth) => auth[0]),
        tap((user) => (this._auth = user)),
        tap((user) => localStorage.setItem('token', user.id))
      );
  }

  logout() {
    this._auth = undefined;
    localStorage.setItem('token', '');
  }
}
