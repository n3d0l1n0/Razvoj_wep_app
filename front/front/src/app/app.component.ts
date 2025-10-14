import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth/auth.selector';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  isLoggedIn$!: Observable<boolean>;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout(); 
    this.store.dispatch(AuthActions.initAuth());
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}