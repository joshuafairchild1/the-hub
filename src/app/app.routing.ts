import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: 'user-search',
    component: UserSearchComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
  {
    path: 'chatrooms/:id',
    component: ChatRoomDetailComponent
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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
