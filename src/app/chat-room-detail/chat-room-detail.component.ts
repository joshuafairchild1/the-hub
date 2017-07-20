import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Chatroom } from '../chat-room.model';
import { ChatRoomService } from '../chat-room.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Message } from '../message.model';

@Component({
  selector: 'app-chat-room-detail',
  templateUrl: './chat-room-detail.component.html',
  styleUrls: ['./chat-room-detail.component.scss'],
  providers: [ChatRoomService]
})
export class ChatRoomDetailComponent implements OnInit {
  chatroomId: string;
  chatRoomToDisplay;
  chatRoomToDisplayMessages;
  messages;

  constructor(private route: ActivatedRoute, private location: Location, private chatroomService: ChatRoomService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.chatroomId = urlParameters['id'];
    });
    this.chatRoomToDisplay = this.chatroomService.getChatRoomById(this.chatroomId);

    this.chatRoomToDisplay.subscribe(data => {
      this.chatRoomToDisplayMessages = data.messages;
      this.chatroomService.getChatRoomMessages(this.chatRoomToDisplay.$key).subscribe(data => this.messages = data
      );
    });
  }
}
