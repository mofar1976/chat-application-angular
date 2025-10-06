import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.logout, (state) => ({ ...state, loading: true })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
