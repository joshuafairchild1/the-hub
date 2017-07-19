import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestingComponent } from './testing/testing.component';
import { ChatRoomComponent } from './'

const appRoutes: Routes = [
  {
    path: '',
    component: TestingComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
