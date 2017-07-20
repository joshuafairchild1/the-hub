import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(
    public database: AngularFireDatabase
  ) { }

  userExists(uid: string) {
    const user = this.database.list(`users`, {query: {
                                              orderByChild: 'uid',
                                              equalTo: uid }});

    console.log(user)

  }
}
