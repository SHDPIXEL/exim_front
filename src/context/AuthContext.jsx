import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? { token } : null;
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setUser({ token });
    navigate('/login')
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);