// services/auth.js

export const getAuthToken = () => localStorage.getItem('authToken');

export const getUserInfo = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
