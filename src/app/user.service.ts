import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    public database: AngularFireDatabase
  ) { }

  userExists(username: string): Observable<boolean> {
    const user = this.database.list(`users`, {query: {orderByChild: 'username',
                                                      equalTo: username}});

    return user.map(data => data[0] ? true : false);
  }

  createUser(newUser: User): void {
    this.database.list(`users`).push(newUser);
  }

  getUserAndSubscribe(username: string): any {

  }
}
