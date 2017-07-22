import { Component, OnInit } from '@angular/core';
import { UserLookupService } from './../github-service/user-lookup.service';
import { UserData } from './../user-data.model';
import { Repo } from './../repo.model';
// import { getUniqueSelection } from './../../assets/js/get-unique-selection';

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
        [],
        user.followers,
        user.following,
        []
      );
      console.log(user);

      this.userSearch.callWithMaxPages(user.repos_url).subscribe(data => {
        const repositoriesData = data.json();
        const allRepos = [];
        repositoriesData.forEach(repo => {
          allRepos.push(new Repo(repo.name,
                              repo.html_url,
                              repo.language,
                              repo.stargazers_count,
                              repo.homepage
                            ));
        });
        this.searchedUser.repos.push(...this.getUniqueSelection(allRepos, 6));
      });

      const url = user.starred_url.split('{')[0];
      this.userSearch.callWithMaxPages(url).subscribe(data => {
        const starredReposData = data.json();
        starredReposData.forEach(repo => {
          this.searchedUser.starredRepos.push(new Repo( repo.name,
                                                        repo.html_url,
                                                        repo.language,
                                                        repo.stargazers_count,
                                                        repo.homepage));
        });
      });
    });
  }

  getUniqueSelection(arr, selectionCount): any[] {
    const tmp: any[] = arr.slice(arr);
    const result = [];

    for (let i: number = 0; i < selectionCount; i++) {
      const index: number = Math.floor(Math.random() * tmp.length);
      result.push(tmp.splice(index, 1)[0]);
    }
    return result;
  }

}
