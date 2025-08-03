// src/services/auth.js
import jwt_decode from 'jwt-decode';

// Token helpers
export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');

// Decode user info from access token
export const getUserInfo = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    return jwt_decode(token); // This gives you user_id, email, etc. if included in token payload
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Get user email (from decoded token)
export const getUserEmail = () => {
  const user = getUserInfo();
  return user?.email || '';
};

// Optional: Logout helper
export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
