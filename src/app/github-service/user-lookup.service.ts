import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { oAuthToken } from './../api-keys';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLookupService {

  private userLookupEndpoint: string = 'https://api.github.com/users/';

  constructor(
    private http: Http
  ) { }

  getUserDetails(username: string): Observable<any> {
    let headers = new Headers();
    headers.append(`Authorization`, `token ${oAuthToken}`);
    if (username) {
      const url = `${this.userLookupEndpoint}${username}`;
      return this.http.get(url, {headers: headers});
    }
  }

  call(url: string): Observable<any> {
    let headers = new Headers();
    headers.append(`Authorization`, `token ${oAuthToken}`);
    return this.http.get(`${url}?per_page=100`, {headers: headers});
  }
}
