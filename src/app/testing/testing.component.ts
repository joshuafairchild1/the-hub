import { Component, OnInit } from '@angular/core';
import { UserLookupService } from './../github-service/user-lookup.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  providers: [UserLookupService]
})
export class TestingComponent implements OnInit {

  // searchedUser = null;

  constructor(
    private userSearch: UserLookupService
  ) { }

  ngOnInit() {

  }

  lookupUser(username: string): void {
    // this.searchedUser = this.userSearch.getUserDetails(username);

    this.userSearch.getUserDetails(username).subscribe(data => console.log(data.json()));
  }

}
