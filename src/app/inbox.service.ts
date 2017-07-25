import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Thread } from './thread.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class InboxService {

  constructor(private database: AngularFireDatabase) {
  }

  // getUserThreads(userName: string) {
  //   return this,database.list('/threads', {
  //     query: {
  //
  //     }
  //   })
  // }

}
