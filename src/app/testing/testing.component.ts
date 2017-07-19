import { Component, OnInit } from '@angular/core';
import { UserLookupService } from './../github-service/user-lookup.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  providers: [UserLookupService]
})
export class TestingComponent implements OnInit {

  constructor(
    private userSearch: UserLookupService
  ) { }

  ngOnInit() {

  }

}
