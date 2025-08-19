import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserInfo } from '../services/auth';

const user = getUserInfo();
console.log('Logged in user:', user);


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store access & refresh tokens
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        // (Optional) store user info if your backend returns it
        // localStorage.setItem('user', JSON.stringify(data.user || {}));

        // Redirect to booking
        navigate('/booking');
      } else {
        setError(
          data.detail ||
          'Login failed. Please check your credentials.'
        );
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Login</h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="flex justify-between mt-4 text-sm text-blue-600">
          <Link to="/signup" className="hover:underline">Sign Up</Link>
          <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
