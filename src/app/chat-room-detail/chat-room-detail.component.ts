import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Chatroom } from '../chat-room.model';
import { ChatRoomService } from '../chat-room.service';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../message.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../user.service';
import { AuthenticationService } from './../authentication/authentication.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat-room-detail',
  templateUrl: './chat-room-detail.component.html',
  styleUrls: ['./chat-room-detail.component.scss'],
  providers: [ChatRoomService,
              UserService,
              AuthenticationService
  ]
})

export class ChatRoomDetailComponent implements OnInit {
  chatroomId: string;
  chatRoomToDisplay;
  chatRoomToDisplayMessages;
  messages: Message [];
  theChatRoom;
  loggedInUser: FirebaseListObservable<any[]>;
  authorizedUser: Observable<firebase.User>;
  loggedInUserName: string;
  chatrooms;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private chatroomService: ChatRoomService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.chatroomId = urlParameters['id'];

      this.chatRoomToDisplay = this.chatroomService.getChatRoomById(this.chatroomId);

      this.chatRoomToDisplay.subscribe(data => {
        this.chatRoomToDisplayMessages = data;
        // console.log(data);
        this.chatroomService.getChatRoomMessages(this.chatRoomToDisplayMessages.$key).subscribe(data => this.messages = data);
      });
      this.authorizedUser = this.authService.user;

      this.authorizedUser.subscribe(data => {
        this.loggedInUser = this.userService.getUserByUID(data.uid);
        this.loggedInUser.subscribe(data => this.loggedInUserName = data[0].username);
      });
      this.chatrooms = this.chatroomService.chatrooms;
    });
  }

  changeChatRoom(chatRoomToShowNow) {
    this.router.navigate([`/chatrooms/${chatRoomToShowNow.$key}`]);
  }

  beginSending(input: string) {
    let dateSent;
    dateSent = Date.now();
    console.log(dateSent);
    const newMessage: Message = new Message(dateSent, this.loggedInUserName, input);
    this.chatroomService.addMessage(this.chatRoomToDisplayMessages, newMessage);
  }
}
