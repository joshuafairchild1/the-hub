import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
<<<<<<< HEAD
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';
=======
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';
import { AboutComponent } from './about/about.component';
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    TestingComponent,
    ChatRoomComponent,
    ChatRoomDetailComponent
=======
    LandingPageComponent,
    NavbarComponent,
    ChatRoomComponent,
    UserSearchComponent,
    RepoSearchComponent,
    AboutComponent
>>>>>>> master
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
