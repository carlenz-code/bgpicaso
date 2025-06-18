"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  role: string;
  loginAs: (newRole: 'planner' | 'auditor') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<'planner' | 'auditor' | 'default'>('default');

  const loginAs = (newRole: 'planner' | 'auditor') => {
    setRole(newRole);
    console.log(`Logueado como: ${newRole}`);
  };

  const logout = () => {
    setRole('default');
    console.log('Sesión cerrada');
  };

  return <AuthContext.Provider value={{ role, loginAs, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}