import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from '../../store/auth/auth.selector';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-librarian-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './librariran-account-component.html',
  styleUrls: ['./librariran-account-component.css']
})
export class LibrarianAccountComponent implements OnInit {
  
  currentUser$!: Observable<AuthState['user']>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }
}