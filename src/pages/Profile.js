import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBus, FaHistory, FaBars, FaTimes, FaSignOutAlt,
  FaTachometerAlt, FaEdit, FaUser
} from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProfile = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://transport-2-0imo.onrender.com/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <FaUser className="text-white text-xl" />
          </div>
          <p className="text-slate-400 text-sm">Loading profile details…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-navy-900 text-white">
      {/* ── SIDEBAR ──────────────────────────────────────── */}
      <AnimatePresence>
        {(menuOpen || true) && (
          <motion.aside
            className={`
              fixed md:relative z-40 h-full md:h-auto
              w-64 flex-shrink-0 flex flex-col
              border-r border-white/5
              transition-transform duration-300
              ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
            style={{ background: "linear-gradient(180deg, #0F1535 0%, #0A0E2A 100%)" }}
          >
            <div className="p-6 border-b border-white/5">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center font-black text-sm shadow-brand">
                  AT
                </div>
                <span className="text-base font-bold">
                  <span className="gradient-text">ASAP</span>
                  <span className="text-white ml-1">Travels</span>
                </span>
              </Link>
            </div>

            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center font-black text-white text-lg shadow-brand">
                  {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">My Account</p>
                  <span className="inline-flex items-center gap-1 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium
                           text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <FaTachometerAlt className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium
                           bg-brand-600/15 text-brand-400 border border-brand-600/20"
              >
                <span className="w-4 h-4 text-center">👤</span>
                My Profile
              </Link>
              <Link
                to="/my-bookings"
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium
                           text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <FaBus className="w-4 h-4" />
                My Bookings
              </Link>
              <Link
                to="/travel-plans"
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium
                           text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <FaHistory className="w-4 h-4" />
                Travel Plans
              </Link>
            </nav>

            <div className="p-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full py-3 px-4 rounded-xl text-sm font-medium
                           text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar overlay (mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/5"
          style={{ background: "rgba(10, 14, 42, 0.95)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-3">
            <button
              className="md:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">User Profile</h1>
              <p className="text-xs text-slate-500">Manage your profile details and settings.</p>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
          {error && (
            <div className="glass-card border-red-500/20 p-4 text-center text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          {user && (
            <motion.div
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header profile card */}
              <div
                className="p-8 text-center border-b border-white/5 relative"
                style={{ background: "linear-gradient(135deg, rgba(59,91,219,0.15) 0%, rgba(0,212,255,0.05) 100%)" }}
              >
                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-2 border-brand-600/40 shadow-brand"
                  />
                ) : (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center font-black text-white text-3xl shadow-brand">
                    {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                )}
                <h2 className="text-2xl font-black text-white">{user.full_name || "Name not set"}</h2>
                <p className="text-slate-400 text-sm mt-1">{user.email}</p>
              </div>

              {/* Detail fields */}
              <div className="p-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <p className="text-base font-semibold text-white bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                      {user.phone_number || "—"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Country</label>
                    <p className="text-base font-semibold text-white bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                      {user.country || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => navigate('/edit-profile')}
                    className="btn-primary text-sm px-6 py-3 flex items-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" /> Edit Profile Details
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

