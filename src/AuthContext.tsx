import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLoginStatus = localStorage.getItem('isLogin');
      if (savedLoginStatus === 'true') {
        setIsLogin(true);
      }
    }
  }, []);
  
  const login = () => {
    setIsLogin(true);
    localStorage.setItem('isLogin', 'true'); 
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem('isLogin'); 
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
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