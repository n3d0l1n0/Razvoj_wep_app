import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LibrarianService } from '../../services/librarian.service';
import * as LibrarianActions from './librarian.actions';
import { Router } from '@angular/router';

@Injectable()
export class LibrarianEffects {
  loadLibrarians$;
  addLibrarian$;
  deleteLibrarian$;
  updateLibrarian$;

  constructor(
    private actions$: Actions,
    private librarianService: LibrarianService,
    private router: Router
  ) {
    this.loadLibrarians$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LibrarianActions.loadLibrarians),
        switchMap(() =>
          this.librarianService.getLibrarians().pipe(
            map((librarians) => LibrarianActions.loadLibrariansSuccess({ librarians })),
            catchError((error) => of(LibrarianActions.loadLibrariansFailure({ error })))
          )
        )
      )
    );
  
    this.addLibrarian$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LibrarianActions.addLibrarian),
        switchMap(({ librarian }) =>
          this.librarianService.createLibrarian(librarian).pipe(
            map((newLibrarian) => LibrarianActions.addLibrarianSuccess({ librarian: newLibrarian })),
            tap(() => {
              alert('Bibliotekar uspešno dodat!');
              this.router.navigate(['/librarians']);
            }),
            catchError((error) => of(LibrarianActions.addLibrarianFailure({ error })))
          )
        )
      )
    );

    this.deleteLibrarian$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LibrarianActions.deleteLibrarian),
        switchMap(({ id }) =>
          this.librarianService.deleteLibrarian(id).pipe(
            map(() => LibrarianActions.deleteLibrarianSuccess({ id })),
            tap(() => alert('Bibliotekar uspešno obrisan!')),
            catchError((error) => of(LibrarianActions.deleteLibrarianFailure({ error })))
          )
        )
      )
    );

    this.updateLibrarian$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LibrarianActions.updateLibrarian),
        switchMap(({ id, librarian }) =>
          this.librarianService.updateLibrarian(id, librarian).pipe(
            map((updatedLibrarian) => LibrarianActions.updateLibrarianSuccess({ librarian: updatedLibrarian })),
            tap(() => {
              alert('Bibliotekar uspešno izmenjen!');
              this.router.navigate(['/librarians']);
            }),
            catchError((error) => of(LibrarianActions.updateLibrarianFailure({ error })))
          )
        )
      )
    );
  }
}