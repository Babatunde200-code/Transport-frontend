import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://your-api-url.com/api/auth/login/', formData);
      
      const token = res.data.token; // or access token
      const userInfo = res.data.user; // Ensure your API returns user info

      // ✅ Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      navigate('/book'); // or wherever you want to redirect after login
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
