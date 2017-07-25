import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './../authentication/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [AuthenticationService]
})
export class AboutComponent {
  loggedInUser: firebase.User;

  constructor(
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = firebase.auth().currentUser;
    // console.log(this.loggedInUser)
    // console.log(this.loggedInUser)
    this.authService.user.subscribe(data => this.loggedInUser = data);
  }

}
