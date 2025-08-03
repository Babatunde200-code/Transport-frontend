export const getAccessToken = () => localStorage.getItem('access');

export const getRefreshToken = () => localStorage.getItem('refresh');

export const getUserInfo = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getUserEmail = () => {
  const user = getUserInfo();
  return user?.email || '';
};
