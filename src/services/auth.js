// src/services/auth.js
import { jwtDecode } from 'jwt-decode';

export const getAuthToken = () => {
  return localStorage.getItem('access');
};

export const getAccessToken = () => {
  return localStorage.getItem('access');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

export const getUserInfo = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const getUserEmail = () => {
  const user = getUserInfo();
  return user?.email || '';
};
