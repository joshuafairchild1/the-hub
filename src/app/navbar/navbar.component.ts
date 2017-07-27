import { Component } from '@angular/core';
import { AuthenticationService } from './../authentication/authentication.service';
import { UserService } from './../user.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarComponent {
  userObservable: Observable<any>;
  githubUsername: string = null;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      if (data) {
        this.userService.getUserByUID(data.uid).subscribe(data => {
          if (data.length) {
            this.githubUsername = data[0].username;
          }
        });
      }
    });
  }

}
