import axios from 'axios';
import { getToken } from '../services/authService';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/', // adjust based on your backend
});

// Automatically attach token if available
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
