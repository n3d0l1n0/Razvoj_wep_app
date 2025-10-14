import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import * as BookActions from './book.actions';

@Injectable()
export class BookEffects {
  loadBooks$;
  addBook$;
  deleteBook$;
  updateBook$;
    bookSuccessRedirect$;

  constructor(
    private actions$: Actions,
    private bookService: BookService,
    private router: Router
  ) {
    this.loadBooks$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BookActions.loadBooks),
        switchMap(() =>
          this.bookService.getAvailableBooks().pipe( 
            map((books) => BookActions.loadBooksSuccess({ books })),
            catchError((error) => of(BookActions.loadBooksFailure({ error })))
          )
        )
      );
    });

    this.addBook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BookActions.addBook),
        switchMap((action) =>
          this.bookService.addBook(action.bookData).pipe(
            map((book) => BookActions.addBookSuccess({ book })),
            catchError((error) => of(BookActions.addBookFailure({ error })))
          )
        )
      );
    });
    this.deleteBook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BookActions.deleteBook),
        switchMap(async ({ id }) => {
          try {
            await this.bookService.deleteBook(id);
            alert('Knjiga uspešno obrisana!');
            return BookActions.deleteBookSuccess({ id });   
          } catch (error: any) { 
            if (error.status === 409) {
              alert('Nije moguće obrisati knjigu koja je iznajmljena.');
            } else {
              alert('Došlo je do greške prilikom brisanja knjige.');
            }
            return BookActions.deleteBookFailure({ error });
          }
        })
      );
    });

    this.updateBook$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(BookActions.updateBook),
        switchMap((action) =>
          this.bookService.updateBook(action.id, action.bookData).pipe(
            map((updatedBook) => 
              BookActions.updateBookSuccess({ 
                book: {
                  id: action.id,   
                  changes: updatedBook  
                } 
              })
            ),
            catchError((error) => of(BookActions.updateBookFailure({ error })))
          )
        )
      );
    });

    this.bookSuccessRedirect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          BookActions.addBookSuccess,
          BookActions.updateBookSuccess
        ),
        tap((action) => {
          if (action.type === BookActions.addBookSuccess.type) {
            alert(`Knjiga "${action.book.naslov}" je uspešno dodata!`);
          } else {
            alert('Knjiga je uspešno izmenjena!');
          }
          this.router.navigate(['/books']);
        })
      );
    }, { dispatch: false }); 
  }
}