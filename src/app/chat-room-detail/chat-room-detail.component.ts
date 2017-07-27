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
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chat-room-detail',
  templateUrl: './chat-room-detail.component.html',
  styleUrls: ['./chat-room-detail.component.scss'],
  providers: [ChatRoomService,
              UserService,
              AuthenticationService
  ]
})

export class ChatRoomDetailComponent {
  chatRoomToDisplay: FirebaseObjectObservable<any>;
  loggedInUser: FirebaseListObservable<any[]>;
  chatrooms: FirebaseListObservable<any[]>;
  chatroomUsers: FirebaseListObservable<any[]>;
  authorizedUser: Observable<firebase.User>;
  messages: Message [];
  chatRoomToDisplayMessages: any;
  loggedInUserName: string;
  chatroomId: string;
  sub: Subscription;

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
    // this.sub =
    this.route.params.subscribe((urlParameters) => {
      this.chatroomId = urlParameters['id'];

      this.chatroomUsers = this.chatroomService.getCurrentChatroomUsers(this.chatroomId);

      this.chatRoomToDisplay = this.chatroomService.getChatRoomById(this.chatroomId);

      this.chatRoomToDisplay.subscribe(data => {
        // this.chatRoomToDisplayMessages = data;
        this.sub = this.chatroomService.getChatRoomMessages(data.$key).subscribe(data => {
          this.messages = data
          console.log('hello')
        });
      });

      this.authorizedUser = this.authService.user;

      this.authorizedUser.subscribe(data => {
        this.loggedInUser = this.userService.getUserByUID(data.uid);
        this.loggedInUser.subscribe(data => this.loggedInUserName = data[0].username);
      });

      this.chatrooms = this.chatroomService.chatrooms;
    });

  }

  changeChatRoom(selectedChatroom: any): void {
    // this.chatroomService.leaveChatroom(this.loggedInUserName, this.chatroomId);
    // this.chatroomService.joinChatRoom(this.loggedInUserName, selectedChatroom.$key);
    this.sub.unsubscribe();
    this.router.navigate([`/chatrooms/${selectedChatroom.$key}`]);
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
