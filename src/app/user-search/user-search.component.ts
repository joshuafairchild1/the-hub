import { Component, OnInit } from '@angular/core';
import { UserLookupService } from './../github-service/user-lookup.service';
import { UserData } from './../user-data.model';
import { Repo } from './../repo.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [UserLookupService]
})
export class UserSearchComponent implements OnInit {

  searchedUser: UserData = null;

  constructor(
    private userSearch: UserLookupService
  ) { }

  ngOnInit() {
  }

  lookupUser(username: string): void {
    this.userSearch.getUserDetails(username).subscribe(data => {
      const user = data.json();

      let repos = [];
      this.userSearch.call(user.repos_url).subscribe(data => {
        const repositories = data.json();
        repositories.forEach(repo => {
          repos.push(new Repo(repo.name,
                              repo.html_url,
                              repo.language,
                              repo.stargazers_count,
                              repo.homepage
                            ));
        });
      });

      let starredRepos = [];
      this.userSearch.call(user.starred_url).subscribe(data => {
        console.log(data);
      });

      this.searchedUser = new UserData(
        user.login,
        user.name,
        user.html_url,
        user.avatar_url,
        user.bio,
        user.location,
        user.created_at,
        user.updated_at,
        user.public_repos,
        repos,
        user.followers,
        user.following,
        [] //this needs to be an array of repositories
      );
      console.log(user);
    });
  }
}
