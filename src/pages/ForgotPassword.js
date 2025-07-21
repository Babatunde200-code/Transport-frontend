import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://transport-2-0imo.onrender.com/password-reset/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) setMessage(data.message);
    else setMessage(data.error || 'Something went wrong');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">Forgot Password</h2>
          {message && <p className="text-center text-sm text-green-600 mb-2">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
