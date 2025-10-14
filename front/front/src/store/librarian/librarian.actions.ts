import { createAction, props } from '@ngrx/store';
import { Librarian } from '../../models/librarian.model';

export const loadLibrarians = createAction('[Librarian List] Load Librarians');
export const loadLibrariansSuccess = createAction('[Librarian API] Load Librarians Success', props<{ librarians: Librarian[] }>());
export const loadLibrariansFailure = createAction('[Librarian API] Load Librarians Failure', props<{ error: any }>());

export const addLibrarian = createAction('[Librarian Form] Add Librarian', props<{ librarian: Partial<Librarian> }>());
export const addLibrarianSuccess = createAction('[Librarian API] Add Librarian Success', props<{ librarian: Librarian }>());
export const addLibrarianFailure = createAction('[Librarian API] Add Librarian Failure', props<{ error: any }>());

export const updateLibrarian = createAction('[Librarian Form] Update Librarian', props<{ id: number; librarian: Partial<Librarian> }>());
export const updateLibrarianSuccess = createAction('[Librarian API] Update Librarian Success', props<{ librarian: Librarian }>());
export const updateLibrarianFailure = createAction('[Librarian API] Update Librarian Failure', props<{ error: any }>());

export const deleteLibrarian = createAction('[Librarian List] Delete Librarian', props<{ id: number }>());
export const deleteLibrarianSuccess = createAction('[Librarian API] Delete Librarian Success', props<{ id: number }>());
export const deleteLibrarianFailure = createAction('[Librarian API] Delete Librarian Failure', props<{ error: any }>());