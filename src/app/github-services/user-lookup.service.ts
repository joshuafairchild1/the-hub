import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserData } from './../models/user-data.model';
import { Repo } from './../models/repo.model';
import { MaxPagesService } from './max-pages.service';
import { getUniqueSelection } from './../../../node_modules/get-unique-selection';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLookupService {

  private userLookupEndpoint = 'https://api.github.com/users/';

  constructor(
    private http: Http,
    private pageService: MaxPagesService
  ) { }

  getUserDetails(username: string): Observable<Response> {
    if (username) {
      const url = `${this.userLookupEndpoint}${username}`;
      return this.http.get(url);
    }
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

      this.pageService.maxPages(user.repos_url).subscribe(data => {
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
        userData.repos = getUniqueSelection(allRepos, 6);
      });

      const starsUrl = user.starred_url.split('{')[0];
      this.pageService.maxPages(starsUrl).subscribe(data => {
        const starredRepos = data.json().map(repo => {
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
        userData.starredRepos = getUniqueSelection(starredRepos, 6);
      });
      return userData;
    });
  }
}
