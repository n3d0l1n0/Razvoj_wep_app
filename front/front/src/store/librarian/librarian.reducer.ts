import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Librarian } from '../../models/librarian.model';
import * as LibrarianActions from './librarian.actions';

export interface LibrarianState extends EntityState<Librarian> {
  error: any;
  loading: boolean;
}

export const adapter: EntityAdapter<Librarian> = createEntityAdapter<Librarian>();

export const initialState: LibrarianState = adapter.getInitialState({
  error: null,
  loading: false,
});

export const librarianReducer = createReducer(
  initialState,
  on(LibrarianActions.loadLibrarians, (state) => ({ ...state, loading: true })),
  on(LibrarianActions.loadLibrariansSuccess, (state, { librarians }) =>
    adapter.setAll(librarians, { ...state, loading: false })
  ),
  on(LibrarianActions.loadLibrariansFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(LibrarianActions.addLibrarianSuccess, (state, { librarian }) => adapter.addOne(librarian, state)),

  on(LibrarianActions.updateLibrarianSuccess, (state, { librarian }) =>
    adapter.updateOne({ id: librarian.id, changes: librarian }, state)
  ),

  on(LibrarianActions.deleteLibrarianSuccess, (state, { id }) => adapter.removeOne(id, state))
);