import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RepoLookupService {

  private repoLookupEndpoint: string = 'https://api.github.com/repos/';

  constructor(
    private http: Http
  ) { }

  getRepoDetails(username: string, repoName: string): Observable<any> {
    if (username && repoName) {
      const url = `${this.repoLookupEndpoint}${username}/${repoName}`;
      return this.http.get(url);
    }
  }
}
