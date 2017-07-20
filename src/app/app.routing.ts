import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { TestingComponent } from './testing/testing.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';
=======


import { TestingComponent } from './testing/testing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';
import { AboutComponent } from './about/about.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
>>>>>>> master

const appRoutes: Routes = [
  {
    path: 'user-search',
    component: UserSearchComponent
  },
  {
    path: '',
<<<<<<< HEAD
    component: TestingComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
  {
    path: 'chatrooms/:id',
    component: ChatRoomDetailComponent
=======
    component: LandingPageComponent
  },
  {
    path: 'repo-search',
    component: RepoSearchComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
>>>>>>> master
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
