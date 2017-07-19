import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLookupService {

  private userLookupEndpoint: string = 'https://api.github.com/users/';

  constructor(
    private http: Http
  ) { }

  getUserDetails(username: string): Observable<any> {
    if (username) {
      const url = `${this.userLookupEndpoint}${username}`;
      // console.log(this.http.get(url));
      return this.http.get(url);
    }
  }
}
