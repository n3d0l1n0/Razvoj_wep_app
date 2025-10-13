import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user/user.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { selectUserById } from '../../store/user/user.selectors';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./user-form-component.html',
  styleUrls: ['./user-form-component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  currentUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      datumRodjenja: ['', Validators.required],
    });

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id), 
      switchMap(idString => {
        const id = Number(idString);
        this.isEditMode = true;
        this.currentUserId = id;

        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        
        this.store.dispatch(UserActions.loadUsers());
        
        return this.store.select(selectUserById({ id })).pipe(
          filter(user => !!user) 
        );
      })
    ).subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formValues = this.userForm.getRawValue();

    const userPayload: Partial<User> = {
      ime: formValues.ime,
      prezime: formValues.prezime,
      email: formValues.email,
      datumRodjenja: formValues.datumRodjenja,
    };

    if (formValues['password']) {
      (userPayload as any)['password'] = formValues['password'];
    }
    
    if (this.isEditMode && this.currentUserId) {
      delete (userPayload as any)['password']; 
      
      this.store.dispatch(UserActions.updateUser({ id: this.currentUserId, user: userPayload }));
    } else {
      this.store.dispatch(UserActions.addUser({ user: userPayload }));
    }
  }
}