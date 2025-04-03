import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      if (timeElapsed > EXPIRATION_TIME) {
        localStorage.clear();
        return null;
      }
      return { token };
    }

    return null;
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginTime', Date.now().toString());
    setUser({ token });

    // Optional: Trigger a manual storage event to sync across tabs
    window.dispatchEvent(new Event("storage"));
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  // Auto logout on expiration (even after refresh)
  useEffect(() => {
    if (user) {
      const checkExpiration = () => {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
          const timeElapsed = Date.now() - parseInt(loginTime, 10);
          if (timeElapsed > EXPIRATION_TIME) {
            logout();
          }
        }
      };

      // Check immediately on mount
      checkExpiration();

      // Set interval to check every minute
      const interval = setInterval(checkExpiration, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
