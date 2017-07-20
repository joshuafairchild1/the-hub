import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TestingComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
  {
    path: 'chatrooms/:id',
    component: ChatRoomDetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
