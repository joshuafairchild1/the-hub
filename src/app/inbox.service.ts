import { Injectable } from '@angular/core';
import { Inbox } from './inbox.model';
import { Thread } from './thread.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class InboxService {
  inbox: FirebaseObjectObservable<any>;
  inboxId: string;

  constructor(private database: AngularFireDatabase) {
    this.inbox = this.database.object('inboxes/' + this.inboxId);
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

  getInboxById(inboxId: string) {
    return this.database.object('inboxes/' + this.inboxId);
  }

  getInboxThreads(inboxId: string) {
    return this.database.list(`inboxes/${inboxId}/threads`);
  }

  // addThread(newThread: Thread) {
  //   this.inbox.threads.push(newThread);
  // }

}
