import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { oAuthToken } from './../api-keys';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RepoLookupService {

  private repoDetailEndpoint = 'https://api.github.com/repos/';
  private repoSearchEndpoint = 'https://api.github.com/search/repositories';

  constructor(
    private http: Http
  ) { }

  getRepoDetails(username: string, repoName: string): Observable<any> {
    // const headers = new Headers();
    // headers.append(`Authorization`, `token ${oAuthToken}`);
    if (username && repoName) {
      const url = `${this.repoDetailEndpoint}${username}/${repoName}`;
      return this.http.get(url);
    }
  }

  callWithMaxPages(url: string): Observable<any> {
    // const headers = new Headers();
    // headers.append(`Authorization`, `token ${oAuthToken}`);
    return this.http.get(`${url}?per_page=100`);
  }

  getRepos(repoName: string): Observable<any> {
    if (repoName) {
      const url = `?q=${repoName}+in:name`;
      return this.http.get(`${this.repoSearchEndpoint}${url}`);
    }
  }
}
