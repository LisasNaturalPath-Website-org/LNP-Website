import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'lnp_admin_auth';
const ADMIN_EMAIL = 'lnpfrontdesk@lisasnaturalpath.com';
const ADMIN_PASSWORD = 'admin';

type AdminAuthContextValue = {
  isAuthenticated: boolean;
  adminEmail: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminEmail, setAdminEmail] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === 'true') return true;
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    try {
      if (isAuthenticated) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [isAuthenticated]);

  const login = useCallback((email: string, password: string) => {
    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return false;
    }
    setAdminEmail(email.trim());
    setIsAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    setAdminEmail('');
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminEmail, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (ctx === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
}
