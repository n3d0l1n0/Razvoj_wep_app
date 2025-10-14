import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Loan } from '../../models/loan.model';
import { loadLoansForUser } from '../../store/loan/loan.action';
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
  template: `
     <h2>Detalji Korisnika</h2>
  <h3>Zaduženja</h3>

  <button class="loan-button" (click)="openLoanModal()">Iznajmi novu knjigu</button>

  <ul class="loan-list">
    <li *ngIf="(loans$ | async)?.length === 0">Korisnik trenutno nema zaduženja.</li>
    <li *ngFor="let loan of loans$ | async">
      <span class="book-title">{{ loan.book.naslov }}</span>
      <span class="return-date">Vratiti do: {{ loan.predvidjeniDatumVracanja | date: 'dd.MM.yyyy' }}</span>
    </li>
  </ul>

  <app-loan-modal
    *ngIf="isModalOpen"
    [userId]="userId"
    (closeModal)="closeLoanModal()"
  ></app-loan-modal>
  `
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
    console.log('Otvaram modal za iznajmljivanje za korisnika:', this.userId);
    this.isModalOpen = true;
  }

  closeLoanModal(): void {
    this.isModalOpen = false;
  }
}