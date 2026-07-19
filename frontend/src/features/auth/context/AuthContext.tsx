import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

import { loginUser, registerUser } from '../api/auth.api';

import { saveToken, removeToken, getToken } from '../services/auth.storage';

type AuthContextType = {
  token: string | null;

  login: (data: any) => Promise<void>;

  register: (data: any) => Promise<void>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken());

  const login = async (data: any) => {
    const response = await loginUser(data);

    const token = response.token;

    saveToken(token);

    setToken(token);
  };

  const register = async (data: any) => {
    await registerUser(data);
  };

  const logout = () => {
    removeToken();

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be inside AuthProvider');

  return context;
}
