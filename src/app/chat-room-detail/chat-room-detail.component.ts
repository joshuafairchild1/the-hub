import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Chatroom } from '../chat-room.model';
import { ChatRoomService } from '../chat-room.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Message } from '../message.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-chat-room-detail',
  templateUrl: './chat-room-detail.component.html',
  styleUrls: ['./chat-room-detail.component.scss'],
  providers: [ChatRoomService,
    // ToasterService
  ],
})

export class ChatRoomDetailComponent implements OnInit {
  chatroomId: string;
  chatRoomToDisplay;
  chatRoomToDisplayMessages;
  messages: Message [];
  theChatRoom;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private chatroomService: ChatRoomService
    // private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.chatroomId = urlParameters['id'];
    });
    this.chatRoomToDisplay = this.chatroomService.getChatRoomById(this.chatroomId);

    this.chatRoomToDisplay.subscribe(data => {
      this.chatRoomToDisplayMessages = data;
      // console.log(data);
      this.chatroomService.getChatRoomMessages(this.chatRoomToDisplayMessages.$key).subscribe(data => this.messages = data);
    });
  }

  beginSending(input: string) {
    var newMessage: Message = new Message('date', 'username', input);
    this.chatroomService.addMessage(this.chatRoomToDisplayMessages, newMessage);
  }

  // popToast() {
  //   this.toasterService.pop('success', 'Args Title', 'Args Body');
  // }
}
