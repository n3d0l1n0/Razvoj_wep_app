import { createReducer, on } from '@ngrx/store';
import { bookAdapter, initialBookState } from './book.state';
import * as BookActions from './book.actions';

export const bookReducer = createReducer(
  initialBookState,

  on(BookActions.loadBooks, (state) => ({ ...state, loading: true })),
  on(BookActions.loadBooksSuccess, (state, { books }) => {
    return bookAdapter.setAll(books, { ...state, loading: false });
  }),
  on(BookActions.loadBooksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(BookActions.addBook, (state) => ({ ...state, loading: true })),
  on(BookActions.addBookSuccess, (state, { book }) => {
    return bookAdapter.addOne(book, { ...state, loading: false });
  }),
  on(BookActions.addBookFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(BookActions.deleteBook, (state) => ({ ...state, loading: true })),
  on(BookActions.deleteBookSuccess, (state, { id }) => {
    return bookAdapter.removeOne(id, { ...state, loading: false });
  }),
  on(BookActions.deleteBookFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(BookActions.updateBook, (state) => ({ ...state, loading: true })),
    on(BookActions.updateBookSuccess, (state, { book }) => {
    return bookAdapter.updateOne(book, { ...state, loading: false });
    }),
    on(BookActions.updateBookFailure, (state, { error }) => ({ ...state, loading: false, error })),
);