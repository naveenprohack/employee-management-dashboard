import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../config/storageKeys.js';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.authUser));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.authToken));
  const [user, setUser] = useState(readStoredUser);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    try {
      const result = await authService.login(credentials);
      localStorage.setItem(STORAGE_KEYS.authToken, result.token);
      localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
      return result;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.authUser);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isAuthenticating,
      login,
      logout,
    }),
    [isAuthenticating, login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
