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
  on(AuthActions.login, (state: AuthState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state: AuthState, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state: AuthState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state: AuthState) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state: AuthState, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.registerFailure, (state: AuthState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state: AuthState) => ({ ...state, loading: true })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.logoutFailure, (state: AuthState, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
