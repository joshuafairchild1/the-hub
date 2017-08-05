import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication/authentication.service';
import { User } from './../models/user.model';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [AuthenticationService]
})
export class LandingPageComponent {
  user: Observable<any> = null;
  loggedIn = false;

  constructor(
    public authService: AuthenticationService
  ) {
    this.authService.user.subscribe(data => {
      if (data == null) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
        this.user = this.authService.user;
      }
    });
  }

  login(): void {
    this.authService.login();
  }

}
