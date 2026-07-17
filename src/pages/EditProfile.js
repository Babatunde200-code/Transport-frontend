import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUser, FaPhone, FaGlobe, FaSave } from 'react-icons/fa';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://transport-2-0imo.onrender.com/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setFormData({
        full_name: res.data.full_name || '',
        phone_number: res.data.phone_number || '',
        country: res.data.country || '',
      });
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError('Failed to fetch profile details.');
      setLoading(false);
    });
  }, [token, navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('https://transport-2-0imo.onrender.com/profile/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      console.error('Update failed', err);
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <FaUser className="text-white text-xl" />
          </div>
          <p className="text-slate-400 text-sm">Loading details...</p>
        </div>
      </div>
    );
  }

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
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" /> Back to Profile
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              ✍️
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Edit Profile</h2>
            <p className="text-blue-200 text-sm">Update your contact and location settings</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm">
                ✅ {success}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaUser className="text-cyan-neon" /> Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="dark-input"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaPhone className="text-brand-400" /> Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="dark-input"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaGlobe className="text-cyan-neon" /> Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
                required
                className="dark-input"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  Save Changes <FaSave className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
