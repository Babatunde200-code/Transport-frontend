import { getAccessToken, getUserEmail } from '../services/auth';
export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const getUserInfo = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  };
  export const getAccessToken = () => localStorage.getItem('access');
export const getRefreshToken = () => localStorage.getItem('refresh');
export const getUserEmail = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).email : '';
};
