import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import * as BookActions from '../../store/book/book.actions';
import { selectAllBooks, selectBookLoading } from '../../store/book/book.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectIsMedior } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list-component.html',
  styleUrls: ['./book-list-component.css']
})
export class BookListComponent implements OnInit {
  books$!: Observable<Book[]>;
  loading$!: Observable<boolean>;
  isMedior$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
    this.books$ = this.store.select(selectAllBooks);
    this.loading$ = this.store.select(selectBookLoading);
    this.isMedior$ = this.store.select(selectIsMedior);
  }

  deleteBook(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovu knjigu?')) {
      this.store.dispatch(BookActions.deleteBook({ id }));
    }
  }
}