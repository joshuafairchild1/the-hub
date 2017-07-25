import { Component, OnInit } from '@angular/core';
import { RepoLookupService } from './../github-service/repo-lookup.service';
import { RepoData } from './../repo-data.model';
import { Repo } from './../repo.model';
import { Contributor } from './../contributor.model';

@Component({
  selector: 'app-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss'],
  providers: [RepoLookupService]
})
export class RepoSearchComponent implements OnInit {

  searchedRepo: RepoData = null;
  searchedRepoCollection: Repo[] = [];

  constructor(
    private repoSearch: RepoLookupService
  ) { }

  ngOnInit() {
  }

  lookupRepo(username: string, repo: string): void {
    this.searchedRepo = null;
    this.searchedRepoCollection = [];

    if (username && repo) {
      const repoResponse = this.repoSearch.getRepoDetails(username, repo);
      this.repoSearch.generateRepoData(repoResponse)
                       .subscribe(data => this.searchedRepo = data);

    } else if (!username && repo) {
      console.log('h')
      const repoListResponse = this.repoSearch.getRepos(repo);
      this.repoSearch.generateRepoList(repoListResponse)
                       .subscribe(data =>  {this.searchedRepoCollection = data; console.log(this.searchedRepoCollection)});
    }
  }

}
