import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat',
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'chat',
    component: ChatsComponent,
    canActivate: [authGuard],
  },
];
