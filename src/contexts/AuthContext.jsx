import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  }, []);

  const login = (accessToken, refreshToken, user) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
    setLoggedInUser(user)
    navigate('/posts');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

