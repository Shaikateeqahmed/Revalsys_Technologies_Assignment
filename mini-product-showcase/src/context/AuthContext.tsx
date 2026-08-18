'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'mini_store_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch (error) {
      console.error('Failed to load user state from localStorage:', error);
      return null;
    }
  });
  const [isLoaded] = useState<boolean>(true);

  const login = (email: string, name: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim() || 'Demo User',
      email: email.trim(),
      isGuest: false,
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: `gst_${Date.now()}`,
      name: 'Guest Customer',
      email: 'guest@checkout.local',
      isGuest: true,
    };
    setUser(guestUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        continueAsGuest,
        logout,
        isAuthenticated: !!user && !user.isGuest,
        isGuest: !!user?.isGuest,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
