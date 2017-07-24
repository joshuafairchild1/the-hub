import { Injectable } from '@angular/core';
import { Inbox } from './inbox.model';
import { Message } from './message.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class InboxService {

  constructor(private database: AngularFireDatabase) {
  }

}
