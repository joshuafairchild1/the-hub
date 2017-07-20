import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../chat-room.service';
import { Chatroom } from '../chat-room.model';
import { Message } from '../message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  providers: [ChatRoomService]
})
export class ChatRoomComponent implements OnInit {

  constructor(private router: Router,
    private chatroomService: ChatRoomService) { }

  chatrooms;

  ngOnInit() {
    this.chatrooms = this.chatroomService.getChatRooms();
  }

  submitForm(name: string) {
    var newChatRoom: Chatroom = new Chatroom(name);
    this.chatroomService.addChatRoom(newChatRoom);
    this.router.navigate(['chatrooms']);
  }

  goToChatRoom(clickedChatRoom) {
    this.router.navigate(['chatrooms', clickedChatRoom.$key]);
  }
}
