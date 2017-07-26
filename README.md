# The Hub
### Arianna Chau, Rose Sponseller, Marilyn Carlin and Joshua Fairchild, July 19th - 27th, 2017
[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=plastic)](https://github.com/ariannachau/week3)

Description coming soon &#128175;

<!-- ## Landing Page: -->
<!-- ![](./src/assets/images/welcome.png) -->

<!-- ## About Page: -->
<!-- ![](./src/assets/images/about.png) -->

<!-- ## Members Page: -->
<!-- ![](./src/assets/images/members.png) -->

<!-- ## Planning

### 1. Configuration/dependencies
  The app will primarily use Angular 4, the AngularCLI, Firebase database, and Typescript. It was made with what I learned from week 3 in the JavaScript track at Epicodus. Stretch goals include:
    * Host the site live

### 2. User Stories
  * As a user, I'd like to visit a page to see a list of all team or club members.
  * As a user, I'd like to click a team or club member's entry in the list to visit their profile page, which should include more details about them.
  * As a user, I'd like the option to visit an "About" page that explains what the club is, and what they do.
  * As a user, I'd like all data persisted in a database, so it's always there when I need it.
  * As a user, I'd like to filter the list of users by their particular role in the group, or some other information/category. (For instance, a club may have a treasurer, president, and/or secretary. A sports team may have a goalie, forward, or striker, a book club may have founders and attendees. You're also welcome to filter by something other than role, if it's more relevant to your project.)
  * As an administrator, I want to add new users to the club. (User authentication is not required).
  * As an administrator, I want to edit user profiles, in case I make a mistake, or need to update their details.
  * As an administrator, need the option to delete a user, in case they leave the club or team.

### 3. Integration
  * Root component/Index page.
  * Contact page
  * About page
  * List members page.
  * Admin page with CRUD functionality for members

### 4. UX/UI
  * Sass

### 5. Polish
  * Refactor code.
  * Delete unused code. -->

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [TypeScript](https://www.typescriptlang.org/)

## Installation

As of writing this README, these instructions work on MacOS.

* Clone this repository

  `$ git clone https://github.com/joshuafairchild1/the-hub`

* Run the following command from the root directory:

  `$ npm install`

This will download the project's dependencies

## Firebase Setup/Configuration

* Sign into the [firebase console](https://firebase.google.com/) and create a new project, then select "Add firebase to your web app". You will be presented with a modal window containing a few script tags, leave this information handy.

* In the directory `src/app` create a file called `api-key.ts` and add the following code:

  ```
  export const masterFirebaseConfig = {
    apiKey: "XXXX",
    authDomain: "XXXX",
    databaseURL: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXX"
  };

  ```
  * Note: for each property of the `masterFirebaseConfig` object, replace 'XXXX' with the information that firebase provided you in the previous step.


* Database content has been provided in a file called `db-content.json`, this can be uploaded to firebase directly.

  * Go to your database in the firebase console and click the button that looks like three dots.

  * Select 'Import JSON', browse, then navigate to the project folder and open the `db-content.json` file. Select 'Import' and your database should be complete!


## Running / Development

Now that everything you need should be installed and setup, you can start the server.

* Run `$ ng serve`
* Visit your app at http://localhost:4200.

## Built With

* Angular 4
* Angular CLI v1.0.0
* [GitHub's](https://developer.github.com/v3/) User, Repository and Search APIs
* CSS/SCSS
* TypeScript
* JavaScript
* Firebase using the [AngularFire2](https://github.com/angular/angularfire2) library

## Authors

Arianna Chau, Rose Sponseller, Marilyn Carlin and Joshua Fairchild

## License

MIT License

Copyright (c) Arianna Chau, Rose Sponseller, Marilyn Carlin and Joshua Fairchild, 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
