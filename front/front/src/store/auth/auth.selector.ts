import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state'; // Proverite da li je putanja tačna
import { AccessLevel } from '../../models/librarian.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state) => !!state.token
);

export const selectUserRole = createSelector(
    selectCurrentUser,
    (user) => user?.nivoPristupa
);

export const selectIsAdmin = createSelector(
    selectUserRole,
    (role) => role === AccessLevel.ADMIN
);

export const selectIsSenior = createSelector(
    selectUserRole,
    (role) => role === AccessLevel.ADMIN || role === AccessLevel.SENIOR
);

export const selectIsMedior = createSelector(
    selectUserRole,
    (role) => role === AccessLevel.ADMIN || role === AccessLevel.SENIOR || role === AccessLevel.MEDIOR
);

export const selectIsAuthInitialized = createSelector(
    selectAuthState,
    (state) => state.isAuthInitialized
);