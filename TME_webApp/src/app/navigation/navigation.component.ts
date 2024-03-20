import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, window } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  username: string | null = null;
  constructor(private authService: AuthService, private router: Router,) { }


  ngOnInit(): void {
    // Call the getUsername function when the component initializes
    this.getUsername();
  }

  getUsername(): void {
    // Call the service method to get the username
    this.username = this.authService.getUsername();
    console.log('Username:', this.username);
  }

  isLoggedIn(): boolean {
    // Return true if the username is not null
    // const loggedIn = !!this.username;
    // console.log('IsLoggedIn:', loggedIn); // Log the isLoggedIn value
    // return loggedIn;
    return !!this.username;
  }

  logout(): void {
    // Remove token from local storage on logout
    this.authService.logout();
    this.username = null;
    this.router.navigate(['/login']);
  }
}
