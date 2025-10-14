import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import * as BookActions from '../../store/book/book.actions'
import * as LoanActions from '../../store/loan/loan.action'
import { selectAvailableBooks } from '../../store/book/book.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanModalComponent implements OnInit {
  @Input() userId!: number;
  @Output() closeModal = new EventEmitter<void>();

  loanForm!: FormGroup;
  availableBooks$!: Observable<Book[]>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      bookId: ['', Validators.required],
      predvidjeniDatumVracanja: ['', Validators.required],
    });

    this.store.dispatch(BookActions.loadBooks());
    this.availableBooks$ = this.store.select(selectAvailableBooks);
  }

  onSubmit(): void {
    if (this.loanForm.invalid) {
      return;
    }

    const loanData = {
      userId: this.userId,
      bookId: Number(this.loanForm.value.bookId),
      predvidjeniDatumVracanja: this.loanForm.value.predvidjeniDatumVracanja,
    };

    this.store.dispatch(LoanActions.addLoan({ loanData }));
    this.closeModal.emit();
  }
}