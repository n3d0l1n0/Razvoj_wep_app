import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css'],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <h2>Login</h2>
  <div class="form-group">
    <label for="email">Email</label>
    <input id="email" type="email" formControlName="email">
    <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error">
      <div *ngIf="loginForm.get('email')?.errors?.['required']">Email je obavezan.</div>
      <div *ngIf="loginForm.get('email')?.errors?.['email']">Unesite validnu email adresu.</div>
    </div>
  </div>

  <div class="form-group">
    <label for="password">Lozinka</label>
    <input id="password" type="password" formControlName="password">
    <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
      Lozinka je obavezna.
    </div>
  </div>

  <button type="submit" [disabled]="loginForm.invalid">Uloguj se</button>
</form>
  `
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
    }
  }
}