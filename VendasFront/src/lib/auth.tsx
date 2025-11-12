export * from './auth2';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; email?: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  // keep the old direct-login helper (accepts a User)
  login: (u: User) => void;
  logout: () => void;
  // add credential-based auth methods
  signIn: (email: string, password?: string) => Promise<void>;
  signUp?: (email: string, password?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={{ user, loading, login: signIn, logout: signOut, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const signIn = async (email: string, _password?: string) => {
    setLoading(true);
    try {
      // replace with real auth call (supabase, etc.)
      const u: User = { id: email, email };
      setUser(u);
      if (u) localStorage.setItem('user', JSON.stringify(u));
    } finally {
      setLoading(false);
    }
  };

  // keep a simple login(u) helper if other code depends on it

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  }
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function setUser(arg0: null) {
  throw new Error('Function not implemented.');
}
