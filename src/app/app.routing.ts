import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSearchComponent } from './user-search/user-search.component';
// import { ChatRoomComponent } from './'

const appRoutes: Routes = [
  {
    path: 'user-search',
    component: UserSearchComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
