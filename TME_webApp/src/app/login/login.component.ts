import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    console.log(this.username,this.password);
    
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => {
          // Redirect to dashboard or desired route upon successful login
          this.router.navigate(['/stock']);
        },
        error => {
          this.errorMessage = error.message;
        }
      );
  }
  


}
