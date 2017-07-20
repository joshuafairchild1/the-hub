import { Component, OnInit } from '@angular/core';
import { RepoLookupService } from './../github-service/repo-lookup.service';
import { RepoData } from './../repo-data.model';

@Component({
  selector: 'app-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss'],
  providers: [RepoLookupService]
})
export class RepoSearchComponent implements OnInit {

  searchedRepo: RepoData = null;

  constructor(
    private repoSearch: RepoLookupService
  ) { }

  ngOnInit() {
  }

  lookupRepo(username: string, repo: string): void {
    this.repoSearch.getRepoDetails(username, repo).subscribe(data => {
      const body = data.json();
      console.log(body);
      this.searchedRepo = new RepoData(
        body.owner.login,
        body.owner.html_url,
        body.owner.avatar_url,
        body.name,
        body.html_url,
        body.clone_url,
        body.description,
        body.homepage,
        body.forks,
        0, //this needs to be the number of commits
        [],  //this needs to be the commits themselves
        body.stargazers_count,
        body.size,
        body.watchers,
        body.language,
        body.created_at,
        body.pushed_at,
        [] //this needs to be an array of contributors
      );
    });
  }

}
