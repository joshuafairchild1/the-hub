import { Component, OnInit } from '@angular/core';
import { RepoLookupService } from './../github-service/repo-lookup.service';
import { RepoData } from './../repo-data.model';
import { Contributor } from './../contributor.model';

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
    if (username && repo) {
      this.repoSearch.getRepoDetails(username, repo).subscribe(data => {
        const repo = data.json();
        // console.log(repo);

        this.searchedRepo = new RepoData(
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
        this.repoSearch.callWithMaxPages(commmitsUrl).subscribe(data => {
          const commits = data.json();
          this.searchedRepo.commitsNumber = commits.length;

          for (let i = 0; i < 6; i++) {
            this.searchedRepo.commits.push({message: commits[i].commit.message,
                                            author: commits[i].commit.author.name,
                                            date: commits[i].commit.author.date});
          }
        });

        this.repoSearch.callWithMaxPages(repo.contributors_url).subscribe(data => {
          const contributors = data.json();
          contributors.forEach(contributor => {
            this.searchedRepo.contributors.push(new Contributor(contributor.login,
                                                                contributor.html_url,
                                                                contributor.avatar_url,
                                                                contributor.contributions));
          });
        });
      });
    } else if (!username && repo) {
      //search for repos by name
      this.repoSearch.getRepos(repo).subscribe(data => {
        console.log(data.json())
      })
    }
  }

}
