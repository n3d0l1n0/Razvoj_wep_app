import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, merge } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { BookStatus } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import * as BookActions from '../book/book.actions';
import * as LoanActions from './loan.action';

@Injectable()
export class LoanEffects {
  loadLoansForUser$;
  addLoan$;
  refreshLoansOnSuccess$;
  deleteLoan$;
  updateBookStatusOnLoanChange$;

  constructor(
    private actions$: Actions,
    private loanService: LoanService,
    private router: Router
  ) {
    this.loadLoansForUser$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoanActions.loadLoansForUser),
        switchMap(({ userId }) =>
          this.loanService.getLoansByUserId(userId).pipe(
            map((loans) => LoanActions.loadLoansSuccess({ loans })),
            catchError((error) => of(LoanActions.loadLoansFailure({ error })))
          )
        )
      );
    });

    this.addLoan$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoanActions.addLoan),
        switchMap(({ loanData }) =>
          this.loanService.createLoan(loanData).pipe(
            map((newLoan) => LoanActions.addLoanSuccess({ loan: newLoan })),
            tap(() => {
              alert('Knjiga je uspešno iznajmljena!');
            }),
            catchError((error) => of(LoanActions.addLoanFailure({ error })))
          )
        )
      );
    });

    this.refreshLoansOnSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoanActions.addLoanSuccess),
        map(({ loan }) => {
            return LoanActions.loadLoansForUser({ userId: loan.user.id });
        })
      );
    });

    this.deleteLoan$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoanActions.deleteLoan),
        switchMap(({ loanId, bookId }) => 
          this.loanService.deleteLoan(loanId).pipe(
            map(() => LoanActions.deleteLoanSuccess({ loanId, bookId })),
            tap(() => alert('Knjiga je uspešno vraćena!')),
            catchError((error) => of(LoanActions.deleteLoanFailure({ error })))
          )
        )
      );
    });

    this.updateBookStatusOnLoanChange$ = createEffect(() => {
      const updateOnAddSuccess$ = this.actions$.pipe(
        ofType(LoanActions.addLoanSuccess),
        map(({ loan }) => {
          return BookActions.updateBook({
            id: loan.book.id,
            bookData: { status: BookStatus.ZADUZENA },
          });
        })
      );

      const updateOnDeleteSuccess$ = this.actions$.pipe(
        ofType(LoanActions.deleteLoanSuccess),
        map(({ bookId }) => {
          return BookActions.updateBook({
            id: bookId,
            bookData: { status: BookStatus.DOSTUPNA }, 
          });
        })
      );

      return merge(
        updateOnAddSuccess$,
        updateOnDeleteSuccess$
      );
    });
  }
}