import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/auth/reset-password/${uid}/${token}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok) setMessage(data.message);
    else setMessage(data.error || 'Error resetting password');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Reset Password</h2>
          {message && <p className="text-sm text-center text-green-600">{message}</p>}
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
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
