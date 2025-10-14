import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as LibrarianActions from '../../store/librarian/librarian.actions';
import { AccessLevel } from '../../models/librarian.model';

@Component({
  selector: 'app-librarian-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './librarian-form-component.html',
  styleUrls: ['./librariran-form-component.css'] 
})
export class LibrarianFormComponent implements OnInit {
  librarianForm!: FormGroup;
  isEditMode = false; 
  accessLevels = Object.values(AccessLevel);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.librarianForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      datumRodjenja: ['', Validators.required],
      nivoPristupa: [AccessLevel.JUNIOR, Validators.required],
    });

    // TO DO: izmeni bibliotekara...
  }

  onSubmit(): void {
    if (this.librarianForm.invalid) {
      return;
    }

    const librarianPayload = this.librarianForm.getRawValue();

    this.store.dispatch(LibrarianActions.addLibrarian({ librarian: librarianPayload as any }));
  }
}