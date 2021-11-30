import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Auth } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/users/${token}`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login(username: string, password: string): Observable<Auth[]> {
    return this.http
      .get<Auth[]>(
        `${this.baseUrl}/users?username=${username}&password=${password}`
      )
      .pipe(
        tap((auth) => (this._auth = auth[0])),
        tap((auth) => localStorage.setItem('token', auth[0].id))
      );
  }

  logout() {
    this._auth = undefined;
    localStorage.setItem('token', '');
  }
}
