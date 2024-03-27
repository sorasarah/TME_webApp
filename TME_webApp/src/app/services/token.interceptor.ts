import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token !== null) {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && this.authService.isTokenExpired(token)) {
            // Token expired, log out the user and redirect to login page
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
    } else {
      // No token found, proceed with the original request
      return next.handle(request);
    }
  }
}
