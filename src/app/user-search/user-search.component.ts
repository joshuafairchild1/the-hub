import { Component } from '@angular/core';
import { UserLookupService } from './../github-services/user-lookup.service';
import { UserData } from './../models/user-data.model';
import { Repo } from './../models/repo.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [UserLookupService]
})
export class UserSearchComponent {

  searchedUser: UserData = null;

  constructor(
    private userSearch: UserLookupService
  ) { }

  lookupUser(username: string): void {
    const userResponse: Observable<Response> = this.userSearch.getUserDetails(username);
    this.userSearch.generateUserData(userResponse).subscribe(data => this.searchedUser = data);
  }
}
