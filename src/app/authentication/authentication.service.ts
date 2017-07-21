import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user.model';


@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  userData

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public userService: UserService
  ) {
    this.user = afAuth.authState;
  }

  login(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(data => {
        const user = new User(data.user.displayName,
                              data.additionalUserInfo.username,
                              data.user.email,
                              data.user.uid,
                              data.user.photoURL);

        this.userService.createUser(user);
      });


  }

  logout(): void {
    this.router.navigate(['']);
    this.afAuth.auth.signOut();
  }

}
