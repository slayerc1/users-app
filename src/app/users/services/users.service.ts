import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?username=${username}`);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  searchUsers(value: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?q=${value}&_limit=5`);
  }

  addUser(user: User): Observable<User> {
    // This would be implemented in the backend
    user.id = user.username;
    user.creationDate = new Date().toISOString().split('T')[0];
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${user.username}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }
}
