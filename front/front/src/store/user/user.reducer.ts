import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../models/user.model';
import * as UserActions from './user.actions';

export interface UserState extends EntityState<User> {
  error: any;
  loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  error: null,
  loading: false,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, loading: false })
  ),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.addUserSuccess, (state, { user }) => adapter.addOne(user, state)),

  on(UserActions.updateUser, (state) => ({ ...state, loading: true })), 
  on(UserActions.updateUserSuccess, (state, { user }) => 
    adapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false })
  ),
  on(UserActions.updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.deleteUser, (state) => ({ ...state, loading: true })), 
  on(UserActions.deleteUserSuccess, (state, { id }) => 
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(UserActions.deleteUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);