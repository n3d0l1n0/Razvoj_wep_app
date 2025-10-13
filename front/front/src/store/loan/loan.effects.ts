import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { BookStatus } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import * as BookActions from '../book/book.actions';
import * as LoanActions from './loan.action';

@Injectable()
export class LoanEffects {
  loadLoansForUser$;
  addLoan$;
  updateBookOnLoanSuccess$;
  refreshLoansOnSuccess$;

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

    this.updateBookOnLoanSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LoanActions.addLoanSuccess),
        map(({ loan }) => {
          return BookActions.updateBook({
            id: loan.book.id,
            bookData: { status: BookStatus.ZADUZENA },
          });
        })
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
  }
}