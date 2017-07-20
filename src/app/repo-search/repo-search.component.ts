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
    this.repoSearch.getRepoDetails(username, repo).subscribe(data => console.log(data.json()));
  }

}
