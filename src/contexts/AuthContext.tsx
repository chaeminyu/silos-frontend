'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  userId: string;
  username: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  name?: string;
  accessLevel?: 'admin' | 'premium' | 'basic';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userId: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userId: string, password: string, username: string, email: string, phone: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasAccess: (requiredLevel: 'USER' | 'ADMIN') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const roleHierarchy = {
  USER: 1,
  ADMIN: 2
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth data in localStorage
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse stored auth data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userId: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const result = await response.json();

      if (result.success) {
        const userData = {
          id: result.data.userId,
          userId: result.data.userId,
          username: result.data.username,
          email: result.data.email,
          phone: result.data.phone,
          role: result.data.role,
          name: result.data.username,
          accessLevel: result.data.role === 'ADMIN' ? 'admin' as const : 'basic' as const
        };
        
        setUser(userData);
        setToken(result.data.accessToken);
        
        // Store in localStorage
        localStorage.setItem('authToken', result.data.accessToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
        
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  const signup = async (userId: string, password: string, username: string, email: string, phone: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password, username, email, phone }),
      });

      const result = await response.json();
      console.log('Raw signup API response:', result); // 전체 응답 확인
      console.log('Response success:', result.success); // success 필드 확인
      console.log('Response data:', result.data); // data 필드 확인

      if (result.success && result.data) {
        const userData = {
          id: result.data.id,
          userId: result.data.userId,
          username: result.data.username,
          email: result.data.email,
          phone: result.data.phone,
          role: result.data.role,
          name: result.data.username,
          accessLevel: result.data.role === 'ADMIN' ? 'admin' as const : 'basic' as const
        };
        
        console.log('Signup successful, setting user:', userData); // 디버깅용
        setUser(userData);
        setToken(result.data.accessToken); // 회원가입 시 받은 토큰으로 자동 로그인
        
        // Store in localStorage
        localStorage.setItem('authToken', result.data.accessToken);
        localStorage.setItem('authUser', JSON.stringify(userData));
        
        return { success: true, message: '회원가입이 완료되었습니다.' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    // Note: Cart data is now managed per-user and should not be cleared on logout
  };

  const hasAccess = (requiredLevel: 'USER' | 'ADMIN'): boolean => {
    if (!user) return false;
    
    const userLevel = roleHierarchy[user.role];
    const required = roleHierarchy[requiredLevel];
    
    return userLevel >= required;
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
    hasAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};