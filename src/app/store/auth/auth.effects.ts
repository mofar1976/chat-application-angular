import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.signInWithEmail(email, password).then(
          (cred: any) => {
            const u = cred.user;
            const user = {
              uid: u.uid,
              email: u.email ?? null,
              displayName: u.displayName ?? null,
              photoURL: u.photoURL ?? null,
            };
            return AuthActions.loginSuccess({ user });
          },
          (err: any) =>
            AuthActions.loginFailure({ error: err?.message || 'Login failed' })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password, displayName }) =>
        this.authService.registerWithEmail(email, password, displayName).then(
          (cred: any) => {
            const u = cred.user;
            const user = {
              uid: u.uid,
              email: u.email ?? null,
              displayName: u.displayName ?? null,
              photoURL: u.photoURL ?? null,
            };
            return AuthActions.registerSuccess({ user });
          },
          (err: any) =>
            AuthActions.registerFailure({
              error: err?.message || 'Register failed',
            })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logoutUser().then(
          () => AuthActions.logoutSuccess(),
          (err: any) =>
            AuthActions.logoutFailure({
              error: err?.message || 'Logout failed',
            })
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => this.router.navigateByUrl(''))
      ),
    { dispatch: false }
  );
}
