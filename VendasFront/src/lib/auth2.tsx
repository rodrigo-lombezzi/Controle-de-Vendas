import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = { id: string; email?: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<void>;
  signUp: (email: string, password?: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const raw = localStorage.getItem('dev_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('dev_user', JSON.stringify(user));
    else localStorage.removeItem('dev_user');
  }, [user]);

  const signUp = async (email: string, _password?: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const u: User = { id: String(Date.now()), email };
    setUser(u);
    setLoading(false);
  };

  const signIn = async (email: string, _password?: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    const u: User = { id: String(Date.now()), email };
    setUser(u);
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
