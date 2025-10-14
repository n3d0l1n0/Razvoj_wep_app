import { createReducer, on } from '@ngrx/store';
import { initialLoanState, loanAdapter } from './loan.state';
import * as LoanActions from './loan.action';

export const loanReducer = createReducer(
  initialLoanState,

  on(LoanActions.loadLoansForUser, (state) => ({ ...state, loading: true })),
  on(LoanActions.loadLoansSuccess, (state, { loans }) => {
    return loanAdapter.setAll(loans, { ...state, loading: false });
  }),
  on(LoanActions.loadLoansFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(LoanActions.addLoan, (state) => ({ ...state, loading: true })),
  on(LoanActions.addLoanSuccess, (state, { loan }) => {
    return loanAdapter.addOne(loan, { ...state, loading: false });
  }),
  on(LoanActions.addLoanFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(LoanActions.deleteLoan, (state) => ({...state, loading: true })),
  on(LoanActions.deleteLoanSuccess, (state, { loanId }) => {
    return loanAdapter.removeOne(loanId, { ...state, loading: false });
  }),
  on(LoanActions.deleteLoanFailure, (state, { error }) => ({ ...state, loading: false, error })),
);