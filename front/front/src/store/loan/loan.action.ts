import { createAction, props } from '@ngrx/store';
import { Loan } from '../../models/loan.model';

export const loadLoansForUser = createAction(
  '[User Details Page] Load Loans For User',
  props<{ userId: number }>()
);

export const loadLoansSuccess = createAction(
  '[Loan API] Load Loans Success',
  props<{ loans: Loan[] }>()
);

export const loadLoansFailure = createAction(
  '[Loan API] Load Loans Failure',
  props<{ error: any }>()
);

export const addLoan = createAction(
  '[Loan Form] Add Loan',
  props<{ loanData: { userId: number, bookId: number, predvidjeniDatumVracanja: string } }>()
);

export const addLoanSuccess = createAction(
  '[Loan API] Add Loan Success',
  props<{ loan: Loan }>()
);

export const addLoanFailure = createAction(
  '[Loan API] Add Loan Failure',
  props<{ error: any }>()
);

export const deleteLoan = createAction(
  '[User Details Page] Delete Loan',
  props<{ loanId: number, bookId: number }>()
);

export const deleteLoanSuccess = createAction(
  '[Loan API] Delete Loan Success',
  props<{ loanId: number, bookId: number }>()
);

export const deleteLoanFailure = createAction(
  '[Loan API] Delete Loan Failure',
  props<{ error: any }>()
);