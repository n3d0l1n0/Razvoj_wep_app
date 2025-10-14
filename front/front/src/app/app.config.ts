import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { UserEffects } from '../store/user/user.effects';
import { userReducer } from '../store/user/user.reducer';
import { LibrarianEffects } from '../store/librarian/librarian.effects';
import { librarianReducer } from '../store/librarian/librarian.reducer';
import { authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import {importProvidersFrom } from '@angular/core';
import { bookReducer } from '../store/book/book.reducer';
import { BookEffects } from '../store/book/book.effects';
import { LoanEffects } from '../store/loan/loan.effects';
import { loanReducer } from '../store/loan/loan.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(HttpClientModule), 

    provideStore({
      users: userReducer,
      librarians: librarianReducer,
      auth: authReducer,
      books: bookReducer,
      loans: loanReducer
    }),

    provideEffects([
      UserEffects,
      LibrarianEffects,
      AuthEffects,
      BookEffects,
      LoanEffects
    ]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
