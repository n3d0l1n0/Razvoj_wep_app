import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as LibrarianActions from '../../store/librarian/librarian.actions';
import { selectLibrarianById } from '../../store/librarian/librarian.selector';
import { AccessLevel, Librarian } from '../../models/librarian.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-librarian-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './librarian-form-component.html',
  styleUrls: ['./librariran-form-component.css']
})
export class LibrarianFormComponent implements OnInit, OnDestroy {
  librarianForm!: FormGroup;
  isEditMode = false;
  librarianId: number | null = null;
  accessLevels = Object.values(AccessLevel);
  private subscription = new Subscription();

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
      password: [''],
      datumRodjenja: ['', Validators.required],
      nivoPristupa: [AccessLevel.JUNIOR, Validators.required],
    });

    const paramSub = this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        this.isEditMode = true;
        this.librarianId = +idStr;

        this.librarianForm.get('password')?.setValidators([Validators.minLength(8)]);
        this.librarianForm.get('password')?.updateValueAndValidity();

        this.store.dispatch(LibrarianActions.loadLibrarian({ id: this.librarianId }));

        const librarianSub = this.store.select(selectLibrarianById({ id: this.librarianId }))
          .pipe(
            filter(librarian => !!librarian)
          )
          .subscribe(librarian => {
            if (librarian) {
                const birthDate = new Date(librarian.user.datumRodjenja);
                const formattedDate = birthDate.toISOString().split('T')[0];

                this.librarianForm.patchValue({
                    ime: librarian.user.ime,
                    prezime: librarian.user.prezime,
                    email: librarian.user.email,
                    datumRodjenja: formattedDate,
                    nivoPristupa: librarian.nivoPristupa
                });
            }
          });
        this.subscription.add(librarianSub);
      } else {
        this.librarianForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
        this.librarianForm.get('password')?.updateValueAndValidity();
      }
    });
    this.subscription.add(paramSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.librarianForm.invalid) {
      return;
    }

    const formValue = this.librarianForm.getRawValue();

    const librarianPayload = {
      user: {
        ime: formValue.ime,
        prezime: formValue.prezime,
        email: formValue.email,
        datumRodjenja: formValue.datumRodjenja,
        ...(formValue.password && { password: formValue.password })
      },
      nivoPristupa: formValue.nivoPristupa,
    };


    if (this.isEditMode && this.librarianId) {
      this.store.dispatch(LibrarianActions.updateLibrarian({ id: this.librarianId, librarian: librarianPayload as any }));
    } else {
      this.store.dispatch(LibrarianActions.addLibrarian({ librarian: librarianPayload as any }));
    }
  }
}