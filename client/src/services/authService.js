// src/services/authService.js
import api from '../utils/api'; // Use the custom Axios instance

// Register user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  
  // Store token if needed
  if (response.token) {
    localStorage.setItem('token', response.token);
  }

  return response.data;
};

// Helper: Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Optional: Logout helper
export const logout = () => {
  localStorage.removeItem('token');
};
