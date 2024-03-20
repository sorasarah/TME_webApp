import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// export class AuthService {
//   constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

//   login(username: string, password: string) {
//     return this.http.post<any>('/api/token/', { username, password });
//   }

//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('access_token');
//     return !this.jwtHelper.isTokenExpired(token);
//   }
// }
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/token/`, credentials)
      .pipe(
        tap(response => {
          // Store JWT token in local storage upon successful login
          localStorage.setItem('token', response.access);
          // Store username in local storage or in a service
          localStorage.setItem('username', credentials.username);
        })
      );
  }

  getUsername(): string | null {
    // Retrieve username from local storage
    return localStorage.getItem('username');
  }

  logout(): void {
    // Remove token from local storage on logout
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists in local storage
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    // Retrieve token from local storage
    return localStorage.getItem('token');
  }
}

