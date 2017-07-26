import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from './../user.model';
import { InboxService } from './../inbox.service';
import { Inbox } from './../inbox.model';
import { Thread } from './../thread.model';
import { Message } from "./../message.model";

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  authenticatedUsername: string;
  message: Message = new Message('1500938715375', 'mcarlin27', 'Welcome to our service');
  messageArray: Message[] = [this.message];
  newThread: Thread = new Thread(this.messageArray);
  threads: Thread[] = [this.newThread];

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public userService: UserService,
    public inboxService: InboxService
  ) {
    this.user = afAuth.authState;
  }

  login(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(signedInUser => {
        if (signedInUser) {


          const username = signedInUser.additionalUserInfo.username;
          this.authenticatedUsername = username;
          // console.log(this.authenticatedUsername)
          this.userService.userExists(username).subscribe(user => {
            if (!user) {
              const newInbox = new Inbox(signedInUser.user.uid, this.threads);
              this.inboxService.createInbox(newInbox);

              const newUser = new User(
                signedInUser.user.displayName,
                username,
                signedInUser.user.email,
                signedInUser.user.uid,
                signedInUser.user.photoURL
              );
              this.userService.createUser(newUser);
            }
          });
        }
      })
  }

  logout(): void {
    this.router.navigate(['']);
    this.afAuth.auth.signOut();
  }

}
