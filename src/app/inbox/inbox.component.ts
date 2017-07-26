import { Component, OnInit } from '@angular/core';
import { Inbox } from '../inbox.model';
import { Message } from '../message.model';
import { Thread } from '../thread.model';
import { User } from "../user.model";
import { InboxService } from '../inbox.service';
import { UserService } from '../user.service';
import { AuthenticationService } from './../authentication/authentication.service';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  providers: [InboxService,
              UserService,
              AuthenticationService
            ]
})
export class InboxComponent implements OnInit {
  inboxToDisplay;
  inboxToDisplayMessages;
  loggedInUser: FirebaseListObservable<any[]>
  authorizedUser: Observable<firebase.User>;
  userId;
  loggedInUserName: string;
  threads: Thread[];

  constructor(
    private inboxService: InboxService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
      this.authorizedUser = this.authService.user;

      this.authorizedUser.subscribe(data => {
        this.userId = data.uid;
        this.inboxToDisplay = this.inboxService.getUserInbox(this.userId);
        this.inboxToDisplay.subscribe(data => {
          this.inboxToDisplayMessages = data;
          this.inboxService.getInboxThreads(this.inboxToDisplayMessages.$key).subscribe(data => {
            this.threads = data
          });
        });
      });
      this.authorizedUser.subscribe(data => {
        this.loggedInUser = this.userService.getUserByUID(data.uid);
        this.loggedInUser.subscribe(data => this.loggedInUserName = data[0].username);
      });
    }

    beginSendingMessage(sendTo: string, input: string) {
      this.userService.userExists(sendTo).subscribe(bool => {
        if (bool) {
          this.userService.getUserByUsername(sendTo).subscribe(data => {
            const userToSendTo = data[0];
            console.log(userToSendTo);
            const newMessage: Message = new Message(Date.now().toString(), this.loggedInUserName, input);
            console.log(newMessage);
            this.inboxService.addThread(newMessage, this.userId, userToSendTo.uid);
          });
        } else {
          alert('This user is not signed up with our service!')
        };
      });
    }
  }
