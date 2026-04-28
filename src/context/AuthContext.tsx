import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: string;
  created_at: string; 
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const userInfoString = localStorage.getItem('userInfo');

      if (token && userInfoString) {
        try {
          const parsedUser = JSON.parse(userInfoString) as User;
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse user info", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userInfo');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Write session credentials from local storage
  const login = (token: string, userInfo: User) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  // Clear session credentials from local storage
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if the users role is admin
  const isAdmin = (): boolean => {
    return user?.role === 'ADMIN'; 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
