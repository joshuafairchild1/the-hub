import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication/authentication.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
  userObservable: Observable<any>;
  userFullName: string = null;
  user: any;

  constructor(
    private authService: AuthenticationService
  ) {
    this.userObservable = this.authService.user;
  }

  ngOnInit(): void {
    this.userObservable.subscribe(data => {
      this.user = data;
    });
  }


  logout(): void {
    this.authService.logout();
  }

}
