import { Injectable } from '@angular/core';
import { Inbox } from './inbox.model';
import { Thread } from './thread.model';
import { Message } from "./message.model";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class InboxService {
  inbox: FirebaseObjectObservable<any>;

  constructor(private database: AngularFireDatabase) {
  }

  createInbox(newInbox: Inbox): void {
    this.database.list(`inboxes`).push(newInbox);
    console.log('hello');
  }

  getUserInbox(userId: string) {
    return this.database.list('inboxes', {
      query: {
        orderByChild: 'senderId',
        equalTo: userId
      }
    });
  }

  getInboxThreads(inboxId: string) {
    return this.database.list(`inboxes/${inboxId}/threads`);
  }

  getInboxById(inboxId: string) {
    return this.database.object('inboxes/' + inboxId);
  }

  addThread(newMessage: Message, senderId: string, receiverId: string) {
    //get a reference to the right inbox by the key with .object()
    //inside the subscribe copy the data to an outside variable
    //modify the copy,
    // then update the instance with the new version to overwrite everything before it

    let newMessageArray: Message[] = [];
    newMessageArray.push(newMessage);
    const newThread: Thread = new Thread(newMessageArray);
    var newInboxThreads;
    var newInbox;
    var inboxRef = this.database.list('inboxes');
    inboxRef.forEach((key) => {
      key.forEach((subkey) => {
        if (subkey.senderId === senderId) {
          newInboxThreads = subkey.threads;
          console.log(newInboxThreads);
          newInbox = this.getInboxById(subkey.$key);
        }
        newInboxThreads.push(newThread);
        newInbox.update({threads: newInboxThreads});
        console.log(newInbox);
        const inboxEntryInFirebase = this.getUserInbox(senderId);
        // inboxEntryInFirebase.remove();
        this.database.list(`inboxes`).push(newInbox);
      });
    });


    // this.getUserInbox(senderId).subscribe(inbox => {
    //   this.database.list(`inboxes/${inbox[0].$key}/threads/messages`).push(newMessage);
    // });
    // this.getUserInbox(receiverId).subscribe(inbox => {
    //   this.database.list(`inboxes/${inbox[0].$key}/threads/messages`).push(newMessage);
    // });
  }
}
