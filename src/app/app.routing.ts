import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
// import { ChatRoomComponent } from './chat-room/chat-room.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TestingComponent
  },
  // {
  //   path: 'chat-room',
  //   component: ChatRoomComponent
  // }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
