import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccessLevel } from '../../models/librarian.model'; // Vaš enum
import { AuthState } from '../auth/auth.state';
import { LibrarianState, adapter } from './librarian.reducer';

export const selectLibrarianState = createFeatureSelector<LibrarianState>('librarians');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAllLibrarians = createSelector(
    selectLibrarianState,
    selectAll
);

export const selectLibrarianEntities = createSelector(
    selectLibrarianState,
    selectEntities
);

export const selectLibrarianLoading = createSelector(
    selectLibrarianState,
    (state) => state.loading
);

export const selectLibrarianById = (props: { id: number }) => createSelector(
    selectLibrarianEntities,
    (entities) => entities[props.id]
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user 
);

export const selectCurrentUserAccessLevel = createSelector(
  selectCurrentUser,
  (user) => user?.nivoPristupa 
);

export const selectIsAdmin = createSelector(
  selectCurrentUserAccessLevel,
  (level) => level === AccessLevel.ADMIN
);

export const selectIsSenior = createSelector(
  selectCurrentUserAccessLevel,
  (level) => level === AccessLevel.SENIOR || level === AccessLevel.ADMIN
);

export const selectIsMedior = createSelector(
    selectCurrentUserAccessLevel,
    (level) => level === AccessLevel.MEDIOR || level === AccessLevel.SENIOR || level === AccessLevel.ADMIN
);