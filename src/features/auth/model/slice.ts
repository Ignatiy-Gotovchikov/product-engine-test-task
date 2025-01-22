import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginPayload } from './types';
import { VALID_USERNAME, VALID_PASSWORD } from './const';

const initialState: AuthState = {
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      const { username, password } = action.payload;
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        state.isAuthenticated = false;
        state.error = 'Invalid username or password';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
    },
    loadSession(state) {
      const isAuth = localStorage.getItem('isAuthenticated');
      if (isAuth === 'true') {
        state.isAuthenticated = true;
      }
    }
  }
});

export const { login, logout, loadSession } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
