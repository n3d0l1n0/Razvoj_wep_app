import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { authResponse }) => ({
    ...state,
    loading: false,
    user: authResponse.user,
    token: authResponse.access_token,
    isAuthInitialized: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthInitialized: true,
  })),
  on(AuthActions.logout, (state) => initialAuthState),
  on(AuthActions.initAuthSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.user,
    token: authResponse.access_token,
    isAuthInitialized: true,
  })),
  on(AuthActions.initAuthFailure, (state) => ({
    ...state,
    isAuthInitialized: true,
  })),
  on(AuthActions.logout, (state) => ({
      ...initialAuthState,
      isAuthInitialized: true
  }))
);