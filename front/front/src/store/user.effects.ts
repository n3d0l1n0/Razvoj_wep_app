import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loadUsers$;
  addUser$;
  deleteUser$;
  updateUser$;
  userModifiedSuccess$;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {
    this.loadUsers$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.loadUsers),
        switchMap(() =>
          this.userService.getUsers().pipe(
            map((users) => UserActions.loadUsersSuccess({ users })),
            catchError((error) => of(UserActions.loadUsersFailure({ error })))
          )
        )
      );
    });

    this.addUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.addUser),
        switchMap(({ user }) =>
          this.userService.createUser(user).pipe(
            map((newUser) => UserActions.addUserSuccess({ user: newUser })),
            tap((action) => {
              alert(`Korisnik "${action.user.ime} ${action.user.prezime}" je uspešno dodat!`);
              this.router.navigate(['/users']);
            }),
            catchError((error) => of(UserActions.addUserFailure({ error })))
          )
        )
      );
    });

    this.deleteUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUser),
        switchMap(({ id }) =>
          this.userService.deleteUser(id).pipe(
            map(() => UserActions.deleteUserSuccess({ id })),
            tap(() => alert('Korisnik uspešno obrisan!')),
            catchError((error) => of(UserActions.deleteUserFailure({ error })))
          )
        )
      );
    });

    this.updateUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(UserActions.updateUser),
        switchMap(({ id, user }) =>
          this.userService.updateUser(id, user).pipe(
            map((updatedUser) => UserActions.updateUserSuccess({ user: updatedUser })),
            tap(() => {
              alert('Korisnik uspešno izmenjen!');
              this.router.navigate(['/users']);
            }),
            catchError((error) => of(UserActions.updateUserFailure({ error })))
          )
        )
      );
    });

    this.userModifiedSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          UserActions.addUserSuccess,
          UserActions.deleteUserSuccess,
          UserActions.updateUserSuccess
        ),
        map(() => UserActions.loadUsers())
      );
    });
  }
}