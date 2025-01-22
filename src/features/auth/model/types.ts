export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}