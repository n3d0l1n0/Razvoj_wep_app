import { AccessLevel } from '../../models/librarian.model';

export interface AuthState {
  user: {
      ime: string;
      prezime: string;
      email: string;
      nivoPristupa: AccessLevel;
  } | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  isAuthInitialized: boolean; 
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
  isAuthInitialized: false,
};