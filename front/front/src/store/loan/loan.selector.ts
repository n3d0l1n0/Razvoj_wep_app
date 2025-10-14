import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loanAdapter, LoanState } from './loan.state';
import { Loan } from '../../models/loan.model';

export const selectLoanState = createFeatureSelector<LoanState>('loans');
const {
  selectAll,
  selectTotal
} = loanAdapter.getSelectors();

export const selectLoansForCurrentUser = createSelector(
  selectLoanState,
  selectAll
);

export const selectLoanLoading = createSelector(
  selectLoanState,
  (state: LoanState) => state.loading
);

export const selectLoanError = createSelector(
  selectLoanState,
  (state: LoanState) => state.error
);

export const selectTotalLoansForCurrentUser = createSelector(
  selectLoanState,
  selectTotal
);