import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { oAuthToken } from './../api-keys';
import { Observable } from 'rxjs/Observable';
import { UserData } from './../user-data.model';
import { Repo } from './../repo.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLookupService {

  private userLookupEndpoint = 'https://api.github.com/users/';

  constructor(
    private http: Http
  ) { }

  getUserDetails(username: string): Observable<Response> {
    // const headers = new Headers();
    // headers.append(`Authorization`, `token ${oAuthToken}`);
    if (username) {
      const url = `${this.userLookupEndpoint}${username}`;
      return this.http.get(url);
    }
  }

  callWithMaxPages(url: string): Observable<Response> {
    // const headers = new Headers();
    // headers.append(`Authorization`, `token ${oAuthToken}`);
    return this.http.get(`${url}?per_page=100`);
  }

  generateUserData(userObservable: Observable<any>): Observable<UserData> {
    return userObservable.map(data => {
      const user = data.json();

      const userData = new UserData(
        user.login,
        user.name,
        user.html_url,
        user.avatar_url,
        user.bio,
        user.location,
        user.created_at,
        user.updated_at,
        user.public_repos,
        [], // array of 6 unique repositories
        user.followers,
        user.following,
        [] // array of starred repositories
      );

      this.callWithMaxPages(user.repos_url).subscribe(data => {
        const allRepos = data.json().map(repo => {
          return new Repo(
            repo.name,
            repo.html_url,
            repo.owner.login,
            repo.owner.html_url,
            repo.owner.avatar_url,
            repo.description,
            repo.language,
            repo.stargazers_count,
            repo.homepage
          );
        });
        userData.repos.push(...this.getUniqueSelection(allRepos, 6));
      });

      const starsUrl = user.starred_url.split('{')[0];
      this.callWithMaxPages(starsUrl).subscribe(data => {
        userData.starredRepos = data.json().map(repo => {
          return new Repo(
            repo.name,
            repo.html_url,
            repo.owner.login,
            repo.owner.html_url,
            repo.owner.avatar_url,
            repo.description,
            repo.language,
            repo.stargazers_count,
            repo.homepage
          );
        });
      });
      return userData;
    });
  }

  getUniqueSelection(arr, selectionCount): any[] {
    const tmp: any[] = arr.slice(arr);
    const result = [];

    for (let i = 0; i < selectionCount; i++) {
      const index: number = Math.floor(Math.random() * tmp.length);
      result.push(tmp.splice(index, 1)[0]);
    }
    return result;
  }
}
