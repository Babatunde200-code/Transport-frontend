import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const [success, setSuccess] = useState('');
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Correct placement

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/reset-password/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Password reset successful.');
        setSuccess('Password changed successfully!');
        setTimeout(() => navigate('/login'), 3000); // 
      } else {
        setMessage(data.error || 'Error resetting password.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Reset Password</h2>
          
          {message && <p className="text-sm text-center text-red-600">{message}</p>}
          {success && <p className="text-sm text-center text-green-600">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Reset Password
            </button>
          </form>

          {success && (
            <div className="text-center mt-4">
              <a
                href="/login"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
