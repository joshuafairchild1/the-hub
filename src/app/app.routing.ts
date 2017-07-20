import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TestingComponent } from './testing/testing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';

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
    path: 'repo-search',
    component: RepoSearchComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
