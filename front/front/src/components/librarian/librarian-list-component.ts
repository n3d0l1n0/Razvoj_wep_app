import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Librarian } from '../../models/librarian.model';
import { selectAllLibrarians, selectLibrarianLoading } from '../../store/librarian/librarian.selector';
import { loadLibrarians, deleteLibrarian } from '../../store/librarian/librarian.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectIsAdmin } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-librarian-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './librarian-list-component.html',
  styleUrls: ['./librarian-list-component.css']
})
export class LibrarianListComponent implements OnInit {
  librarians$!: Observable<Librarian[]>;
  loading$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadLibrarians());
    this.librarians$ = this.store.select(selectAllLibrarians);
    this.loading$ = this.store.select(selectLibrarianLoading);
    this.isAdmin$ = this.store.select(selectIsAdmin); 
  }

  deleteLibrarian(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovog bibliotekara?')) {
      this.store.dispatch(deleteLibrarian({ id }));
    }
  }
}