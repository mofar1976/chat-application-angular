import { Routes } from '@angular/router';
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
