import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, adapter } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

const { selectAll, selectTotal } = adapter.getSelectors();

export const selectAllUsers = createSelector(selectUserState, selectAll);
export const selectUserTotal = createSelector(selectUserState, selectTotal);
export const selectUserLoading = createSelector(selectUserState, (state) => state.loading);
export const selectUserById = (props: { id: number }) => createSelector(
    selectAllUsers,
    (users) => users.find(user => user.id === props.id)
  );