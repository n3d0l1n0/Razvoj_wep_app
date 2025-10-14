import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import * as BookActions from '../../store/book/book.actions';
import { selectBookById } from '../../store/book/book.selectors';
import { Book, BookCondition, BookStatus } from '../../models/book.model';
import { CommonModule } from '@angular/common';

import { EntityState } from '@ngrx/entity';

interface BookFeatureState {
  books: EntityState<Book>;
}

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form-components.html',
  styleUrls: ['./book-form-component.css']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  private currentBookId: number | null = null;
  
  bookConditions = Object.values(BookCondition);
  bookStatuses = Object.values(BookStatus);

  constructor(
    private fb: FormBuilder, 
    private store: Store<BookFeatureState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkRouteForEditMode();
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      naslov: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      stanje: [BookCondition.DOBRO, Validators.required],
      status: [BookStatus.DOSTUPNA, Validators.required],
    });
  }

  private checkRouteForEditMode(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null)
    ).subscribe(idString => {
      this.isEditMode = true;
      this.currentBookId = Number(idString);
      this.store.dispatch(BookActions.loadBooks());
        this.store.select(selectBookById(this.currentBookId)).pipe(
        filter((book): book is Book => !!book), 
        take(1) 
      ).subscribe(book => {
        this.bookForm.patchValue(book); 
      });
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    if (this.isEditMode && this.currentBookId) {
      this.store.dispatch(BookActions.updateBook({
        id: this.currentBookId,
        bookData: this.bookForm.value
      }));
    } else {
      this.store.dispatch(BookActions.addBook({ bookData: this.bookForm.value }));
    }
  }
}