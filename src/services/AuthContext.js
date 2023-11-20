import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData) => {

    const { id, token, userId } = userData;
    setUser({ id, ...userData });
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    // Xử lý logic đăng xuất
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Xóa Token khỏi header của mỗi yêu cầu Axios
    delete axios.defaults.headers.common['Authorization'];
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
