import { Routes } from '@angular/router';
import { UserFormComponent } from '../components/user-form-component';
import { UserListComponent } from '../components/user-list-component';

export const appRoutes: Routes = [
  { 
    path: 'users', 
    component: UserListComponent 
  },
  { 
    path: 'users/new', 
    component: UserFormComponent 
  },
  { path: 'users/:id/edit', component: UserFormComponent }, 
  { 
    path: '', 
    redirectTo: '/users', 
    pathMatch: 'full' 
  },
];