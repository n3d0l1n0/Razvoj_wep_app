import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../../services/auth.service';

export const login = createAction(
    '[Auth] Login', 
    props<{ credentials: { email: string, password: string } }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const initAuth = createAction('[Auth] Init Auth');