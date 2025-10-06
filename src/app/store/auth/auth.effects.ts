import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { map, mergeMap, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.signInWithEmail(email, password).then(
          (cred) => AuthActions.loginSuccess({ user: cred.user }),
          (err) =>
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
          (cred) => AuthActions.registerSuccess({ user: cred.user }),
          (err) =>
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
          (err) =>
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
