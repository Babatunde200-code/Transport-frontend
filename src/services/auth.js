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
  