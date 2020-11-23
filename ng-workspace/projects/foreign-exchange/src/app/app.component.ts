import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'lib-mslogin';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'foreign-exchange';
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.currentUser) {
        // this.router.navigate(['/login'] );
    }

    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
}
