import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess('');

    try {
      const res = await fetch(
        `https://transport-2-0imo.onrender.com/reset-password/${uid}/${token}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || 'Password reset successful.');
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setMessage(data.error || 'Error resetting password.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">

          <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
            Reset Your Password
          </h2>

          {message && (
            <p className="text-sm text-center text-red-600 mb-3">{message}</p>
          )}

          {success && (
            <p className="text-sm text-center text-green-600 mb-3">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white transition
                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {loading ? 'Processing...' : 'Reset Password'}
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
