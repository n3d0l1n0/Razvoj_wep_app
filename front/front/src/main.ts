import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),

    provideHttpClient(),
    
    provideStore({ users: userReducer }),

    provideEffects([UserEffects]),

    provideStoreDevtools({ maxAge: 25 })
  ]
}).catch(err => console.error(err));