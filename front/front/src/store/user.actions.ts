import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User API] Load Users Failure', props<{ error: any }>());

export const addUser = createAction('[User Form] Add User', props<{ user: Partial<User> }>());
export const addUserSuccess = createAction('[User API] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User API] Add User Failure', props<{ error: any }>());

export const updateUser = createAction('[User Form] Update User', props<{ id: number; user: Partial<User> }>());
export const updateUserSuccess = createAction('[User API] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User API] Update User Failure', props<{ error: any }>());

export const deleteUser = createAction('[User List] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[User API] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[User API] Delete User Failure', props<{ error: any }>());