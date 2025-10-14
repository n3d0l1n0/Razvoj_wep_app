import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home-component';
import { UserFormComponent } from '../components/user/user-form-component';
import { UserListComponent } from '../components/user/user-list-component';
import { LibrarianListComponent } from '../components/librarian/librarian-list-component';
import { LibrarianFormComponent } from '../components/librarian/librarian-form-component';
import { LibrarianAccountComponent } from '../components/librarian/librariran-account-component';
import { LoginComponent } from '../components/auth/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailsComponent } from '../components/user/user-details-component';
import { BookListComponent } from '../components/book/book-list-component';
import { BookFormComponent } from '../components/book/book-form-component';
import { AccessLevel } from '../models/librarian.model';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { 
    path: 'users/new', 
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN, AccessLevel.SENIOR] }
  },
  { 
    path: 'users/:id/edit', 
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN, AccessLevel.SENIOR] }
  },
  { 
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'librarians', 
    component: LibrarianListComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'librarians/add',
    component: LibrarianFormComponent, 
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN] }
  },
  { 
    path: 'librarians/:id/edit', 
    component: LibrarianFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN] }
  },
  { 
    path: 'librarians/my-account', 
    component: LibrarianAccountComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  { 
    path: 'books', 
    component: BookListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'books/add', 
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN, AccessLevel.SENIOR, AccessLevel.MEDIOR] }
  },
  { 
    path: 'books/:id/edit',
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [AccessLevel.ADMIN, AccessLevel.SENIOR, AccessLevel.MEDIOR] }
  },
  { path: '**', redirectTo: '/home' } 
];