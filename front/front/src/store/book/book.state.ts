import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../../models/book.model';

export interface BookState extends EntityState<Book> {
  loading: boolean;
  error: any;
}

export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialBookState: BookState = bookAdapter.getInitialState({
  loading: false,
  error: null,
});