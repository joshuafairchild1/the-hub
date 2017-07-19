import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestingComponent } from './testing/testing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
  {
    path: 'test',
    component: TestingComponent
  },
  {
    path: '',
    component: LandingPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
