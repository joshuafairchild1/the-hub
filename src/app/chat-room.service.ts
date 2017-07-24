import { Injectable } from '@angular/core';
import { Chatroom } from './chat-room.model';
import { Message } from './message.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class ChatRoomService {
  chatrooms: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.chatrooms = database.list('chatrooms');
  }

  getChatRooms() {
    return this.database.list('/chatrooms', {
      query: {
        orderByChild: 'messages'
      }
    });
  }

  addChatRoom(newChatRoom: Chatroom) {
    this.chatrooms.push(newChatRoom);
  }

  getChatRoomById(chatroomId: string) {
    return this.database.object('chatrooms/' + chatroomId);
  }

  deleteChatRoom(localChatRoomToDelete) {
    const chatRoomEntryInFirebase = this.getChatRoomById(localChatRoomToDelete.$key);
    chatRoomEntryInFirebase.remove();
  }

  addMessage(localChatRoom, messageToAdd: Message) {
    this.database.list(`chatrooms/${localChatRoom.$key}/messages`).push(messageToAdd);
  }

  getChatRoomMessages(chatroomId: string) {
    return this.database.list(`chatrooms/${chatroomId}/messages`);
  }
}
