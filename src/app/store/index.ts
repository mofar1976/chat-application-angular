import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export const provideAppStore = () => [
  provideStore({ auth: authReducer }),
  provideEffects([AuthEffects]),
];
