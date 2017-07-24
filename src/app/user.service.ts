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
    return this.getUserByUsername(username).map(data => !!data[0]);
  }

  createUser(newUser: User): void {
    this.database.list(`users`).push(newUser);
  }

  getUserByUsername(username: string): FirebaseListObservable<any[]> {
    return this.database.list(`users`, {query: {orderByChild: 'username', equalTo: username}});
  }

  getUserByUID(uid: string): FirebaseListObservable<any[]> {
    return this.database.list(`users`, {query: {orderByChild: 'uid', equalTo: uid}});
  }
}
