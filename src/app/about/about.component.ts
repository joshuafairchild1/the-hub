import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  loggedInUser: any;

  constructor() {}

  ngDoCheck(): void {
    this.loggedInUser = firebase.auth().currentUser;
    console.log(this.loggedInUser)
  }

}
