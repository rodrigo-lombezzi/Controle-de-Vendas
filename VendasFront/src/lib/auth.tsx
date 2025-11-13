import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; email?: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (u: User) => void;
  logout: () => void;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, password?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, _password?: string) => {
    setLoading(true);
    try {
      // TODO: replace with real auth call (supabase)
      const u: User = { id: email, email };
      setUser(u);
      if (u) localStorage.setItem('user', JSON.stringify(u));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, _password?: string) => {
    setLoading(true);
    try {
      // TODO: replace with real signup call
      const u: User = { id: email, email };
      setUser(u);
      if (u) localStorage.setItem('user', JSON.stringify(u));
    } finally {
      setLoading(false);
    }
  };

  const login = (u: User) => {
    setUser(u);
    if (u) localStorage.setItem('user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
