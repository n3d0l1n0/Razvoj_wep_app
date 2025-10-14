import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { selectIsLoggedIn } from '../../store/auth/auth.selector';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit { 
  isLoggedIn$!: Observable<boolean>; 

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  }
}