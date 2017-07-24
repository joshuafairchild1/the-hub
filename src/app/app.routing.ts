import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './route-guards/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'user-search',
    component: UserSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chatrooms/:id',
    component: ChatRoomDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'repo-search',
    component: RepoSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
