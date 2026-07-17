import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('https://transport-2-0imo.onrender.com/api/forgot-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Password reset code sent to your email.');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-navy-900 text-white"
      style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-neon/8 blur-[100px] pointer-events-none" />

      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              🔑
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Forgot Password</h2>
            <p className="text-blue-200 text-sm">Reset your password securely</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm"
              >
                ✅ {message}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-cyan-neon" /> Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="dark-input"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Please wait...' : 'Send Reset Link →'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
