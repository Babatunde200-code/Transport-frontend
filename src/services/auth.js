// services/auth.js
export const getAuthToken = () => localStorage.getItem('access_token');
export const getUserInfo = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  