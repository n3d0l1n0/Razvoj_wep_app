import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loan } from '../../models/loan.model';

export interface LoanState extends EntityState<Loan> {
  loading: boolean;
  error: any;
}

export const loanAdapter: EntityAdapter<Loan> = createEntityAdapter<Loan>();

export const initialLoanState: LoanState = loanAdapter.getInitialState({
  loading: false,
  error: null,
});