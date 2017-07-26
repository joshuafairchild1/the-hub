import { Component, OnInit } from '@angular/core';
import { RepoLookupService } from './../github-service/repo-lookup.service';
import { RepoData } from './../repo-data.model';
import { Repo } from './../repo.model';
import { Contributor } from './../contributor.model';
import { getUniqueSelection } from './../../../node_modules/get-unique-selection';


@Component({
  selector: 'app-repo-search',
  templateUrl: './repo-search.component.html',
  styleUrls: ['./repo-search.component.scss'],
  providers: [RepoLookupService]
})
export class RepoSearchComponent implements OnInit {

  searchedRepo: RepoData = null;
  searchedRepoCollection: Repo[] = [];
  repoSample: Repo[] = null;

  constructor(
    private repoSearch: RepoLookupService
  ) { }

  ngOnInit() {
    this.repoSearch.getSampleRepositories().subscribe(data => {
      this.repoSample = getUniqueSelection(data, 6);
    });
  }

  lookupRepo(username: string, repo: string): void {
    this.searchedRepo = null;
    this.repoSample = null;
    this.searchedRepoCollection = [];

    if (username && repo) {
      const repoResponse = this.repoSearch.getRepoDetails(username, repo);
      this.repoSearch.generateRepoData(repoResponse)
                        .subscribe(data => this.searchedRepo = data);

    } else if (!username && repo) {
      const repoListResponse = this.repoSearch.getRepos(repo);
      this.repoSearch.generateRepoList(repoListResponse)
                        .subscribe(data =>  this.searchedRepoCollection = data);
    }
  }

}
