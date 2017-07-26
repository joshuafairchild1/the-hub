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
  chatRoomToDisplay: FirebaseObjectObservable<any>;
  chatRoomToDisplayMessages: any;
  messages: Message [];
  loggedInUser: FirebaseListObservable<any[]>;
  authorizedUser: Observable<firebase.User>;
  loggedInUserName: string;
  chatrooms: FirebaseListObservable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private chatroomService: ChatRoomService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((urlParameters) => {
      this.chatroomId = urlParameters['id'];
      console.log(this.chatroomId)

      this.chatRoomToDisplay = this.chatroomService.getChatRoomById(this.chatroomId);

      this.chatRoomToDisplay.subscribe(data => {
        this.chatRoomToDisplayMessages = data;
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

  changeChatRoom(chatRoomToShowNow): void {
    this.router.navigate([`/chatrooms/${chatRoomToShowNow.$key}`]);
  }

  submitForm(name: string): void {
    const newChatRoom: Chatroom = new Chatroom(name);
    this.chatroomService.addChatRoom(newChatRoom);
  }

  beginSending(input: string): void {
    const newMessage: Message = new Message(Date.now().toString(), this.loggedInUserName, input);
    this.chatroomService.addMessage(this.chatRoomToDisplayMessages, newMessage);
  }
}
