import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authorities, setAuthorities] = useState([]);

  const login = (userData) => {

    const { id, token, userId, authorities } = userData;
    setUser({ id, ...userData });
    setToken(token);
    setAuthorities(authorities);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
   
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthorities([]);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
  };

  const hasAdminOrStaffRole = () => {
    return authorities.some(
      (authority) => authority.authority === "ROLE_ADMIN" || authority.authority === "ROLE_STAFF"
    );
  };

  const hasAdminRole = () => {
    return authorities.some(
      (authority) => authority.authority === "ROLE_ADMIN"
    );
  };

  const hasStaffRole = () => {
    return authorities.some(
      (authority) => authority.authority === "ROLE_STAFF"
    );
  };

  const hasUserRole = () => {
    return authorities.some(
      (authority) => authority.authority === "ROLE_USER"
    );
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasAdminOrStaffRole, hasAdminRole, hasStaffRole, hasUserRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
