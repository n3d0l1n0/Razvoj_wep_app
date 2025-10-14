import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Loan } from '../../models/loan.model';
import { loadLoansForUser, deleteLoan } from '../../store/loan/loan.action';
import { selectLoansForCurrentUser } from '../../store/loan/loan.selector';
import { LoanModalComponent } from '../loan/loan.component';
@Component({
selector: 'app-user-details',
standalone: true,
imports: [
CommonModule,
LoanModalComponent
],
styleUrls: ['./user-details-component.css'],
templateUrl: './user-details-components.html' 
})
  export class UserDetailsComponent implements OnInit {
  userId!: number;
  loans$!: Observable<Loan[]>;
  isModalOpen = false;
  constructor(private route: ActivatedRoute, private store: Store) {}
    ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadLoansForUser({ userId: this.userId }));
    this.loans$ = this.store.select(selectLoansForCurrentUser);
    }
    openLoanModal(): void {
    this.isModalOpen = true;
    }
    closeLoanModal(): void {
    this.isModalOpen = false;
    }
    deleteLoan(loanId: number, bookId: number): void {
    if (confirm('Da li ste sigurni da želite da vratite ovu knjigu?')) {
    this.store.dispatch(deleteLoan({ loanId, bookId }));
    }
  }
}