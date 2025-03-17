import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  id: number;
  google_id: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Commented out real API call
    /*try {
      const response = await fetch('/api/v1/auth/profile', {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }*/

    // Sample data
    setUser({
      email: "student@university.edu",
      id: 1,
      google_id: "sample123"
    });
  };

  const login = () => {
    // Commented out real login
    // window.location.href = '/api/v1/auth/login';
    
    // Sample login
    setUser({
      email: "student@university.edu",
      id: 1,
      google_id: "sample123"
    });
    navigate('/');
  };

  const logout = async () => {
    // Commented out real logout
    /*try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }*/

    // Sample logout
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};