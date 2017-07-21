import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
  user;
  userFullName: string = null;

  constructor(
    private authService: AuthenticationService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    if (this.user != null) {
      this.user.subscribe(data => {
        this.userFullName = data.displayName;
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
