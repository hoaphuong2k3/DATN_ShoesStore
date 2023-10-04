import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem('token') || null); 

  const login = (userData) => {
    
    const { id, token } = userData;
    setUser({ id, ...userData }); 
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    // Xử lý logic đăng xuất
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
