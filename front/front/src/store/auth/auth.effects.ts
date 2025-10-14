import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$;
  loginSuccess$;
  logout$;
  initAuth$;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    this.login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(action =>
          this.authService.login(action.credentials).pipe(
            map(authResponse => AuthActions.loginSuccess({ authResponse })),
            catchError(error => of(AuthActions.loginFailure({ error: error.message })))
          )
        )
      );
    });

    this.loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(() => this.router.navigate(['/librarians']))
        );
      },
      { dispatch: false }
    );
    
    this.logout$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => {
            this.authService.logout();
            this.router.navigate(['/login']);
          })
        );
      },
      { dispatch: false }
    );

    this.initAuth$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.initAuth),
        map(() => {
            const token = this.authService.getToken();
            const user = this.authService.getUser();
            if (token && user) {
                return AuthActions.initAuthSuccess({ authResponse: { access_token: token, user } });
            }
            return AuthActions.initAuthFailure(); 
        })
      );
    });
  }
}