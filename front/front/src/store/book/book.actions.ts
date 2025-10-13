import { createAction, props } from '@ngrx/store';
import { Book } from '../../models/book.model';
import { Update } from '@ngrx/entity';

export const loadBooks = createAction('[Book List] Load Books');
export const loadBooksSuccess = createAction('[Book API] Load Books Success', props<{ books: Book[] }>());
export const loadBooksFailure = createAction('[Book API] Load Books Failure', props<{ error: any }>());

export const addBook = createAction('[Book Form] Add Book', props<{ bookData: Partial<Book> }>());
export const addBookSuccess = createAction('[Book API] Add Book Success', props<{ book: Book }>());
export const addBookFailure = createAction('[Book API] Add Book Failure', props<{ error: any }>());

export const deleteBook = createAction('[Book List] Delete Book', props<{ id: number }>());
export const deleteBookSuccess = createAction('[Book API] Delete Book Success', props<{ id: number }>());
export const deleteBookFailure = createAction('[Book API] Delete Book Failure', props<{ error: any }>());

export const updateBook = createAction('[Book Form] Update Book', props<{ id: number, bookData: Partial<Book> }>());
export const updateBookSuccess = createAction('[Book API] Update Book Success', props<{ book: Update<Book> }>());
export const updateBookFailure = createAction('[Book API] Update Book Failure', props<{ error: any }>());
