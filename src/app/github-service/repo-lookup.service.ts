import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { oAuthToken } from './../api-keys';
import { Observable } from 'rxjs/Observable';
import { RepoData } from './../repo-data.model';
import { Repo } from './../repo.model';
import { Contributor } from './../contributor.model';

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

  generateRepoData(repoResponse: Observable<Response>): Observable<RepoData> {
    return repoResponse.map(data => {
      const repo = data.json();

      const searchedRepo = new RepoData(
        repo.owner.login,
        repo.owner.html_url,
        repo.owner.avatar_url,
        repo.name,
        repo.html_url,
        repo.clone_url,
        repo.description,
        repo.homepage,
        repo.forks,
        0, // number of commits
        [],  // array of 5 last commits
        repo.stargazers_count,
        repo.size,
        repo.watchers,
        repo.language,
        repo.created_at,
        repo.pushed_at,
        [] // array of contributors
      );

      const commmitsUrl = repo.commits_url.split('{')[0];
      this.callWithMaxPages(commmitsUrl).subscribe(data => {
        const commits = data.json();
        searchedRepo.commitsNumber = commits.length;

        for (let i = 0; i < 6; i++) {
          const {message, author: {name}, author: {date}} = commits[i].commit;
          searchedRepo.commits.push({message, name, date});
        }
      });

      this.callWithMaxPages(repo.contributors_url).subscribe(data => {
        searchedRepo.contributors = data.json().map(contributor => {
          const {login, html_url, avatar_url, contributions} = contributor;
          return new Contributor(login, html_url, avatar_url, contributions);
        });
      });
      return searchedRepo;
    });
  }

  generateRepoList(repoListResponse: Observable<Response>): Observable<Repo[]> {
    return repoListResponse.map(data => { // Observable.map()
      return data.json().items.map(repo => { // Array.map()
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
  }
}
