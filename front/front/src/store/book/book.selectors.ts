import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookAdapter, BookState } from './book.state';
import { Dictionary } from '@ngrx/entity';
import { Book } from '../../models/book.model';
import { BookStatus } from '../../models/book.model';

export const selectBookState = createFeatureSelector<BookState>('books');

const { 
  selectAll, 
  selectTotal, 
  selectEntities 
} = bookAdapter.getSelectors();

export const selectAllBooks = createSelector(
  selectBookState, 
  selectAll
);

export const selectTotalBooks = createSelector(
  selectBookState, 
  selectTotal
);

export const selectBookEntities = createSelector(
  selectBookState, 
  selectEntities
);


export const selectBookLoading = createSelector(
  selectBookState,
  (state: BookState) => state.loading
);

export const selectBookError = createSelector(
  selectBookState,
  (state: BookState) => state.error
);

export const selectBookById = (id: number) => createSelector(
  selectBookEntities,
  (entities: Dictionary<Book>) => {
    return entities[id];
  }
);

export const selectAvailableBooks = createSelector(
    selectAllBooks,
    (books: Book[]) => books.filter(book => book.status === BookStatus.DOSTUPNA)
  );