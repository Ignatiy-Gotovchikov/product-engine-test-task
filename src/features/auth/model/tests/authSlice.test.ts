import { authReducer, login, logout } from '../slice';
import { AuthState } from '../types';

describe('authSlice', () => {
  it('should login with valid credentials', () => {
    const initialState: AuthState = {
      isAuthenticated: false,
      error: null
    };

    const nextState = authReducer(
      initialState,
      login({ username: 'admin', password: 'admin123' })
    );

    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should fail login with invalid credentials', () => {
    const initialState: AuthState = {
      isAuthenticated: false,
      error: null
    };

    const nextState = authReducer(
      initialState,
      login({ username: 'wrong', password: 'wrong123' })
    );

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.error).toBe('Invalid username or password');
  });

  it('should logout and clear local storage', () => {
    const initialState: AuthState = {
      isAuthenticated: true,
      error: null
    };

    const nextState = authReducer(initialState, logout());
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.error).toBeNull();
  });
});
