import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { selectAllUsers, selectUserLoading } from '../../store/user/user.selectors';
import { loadUsers, deleteUser } from '../../store/user/user.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { selectIsSenior } from '../../store/librarian/librarian.selector';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list-component.css']
  })

export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  isSenior$!: Observable<boolean>;


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.isSenior$ = this.store.select(selectIsSenior);
  }

  deleteUser(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      this.store.dispatch(deleteUser({ id }));
    }
  }
}