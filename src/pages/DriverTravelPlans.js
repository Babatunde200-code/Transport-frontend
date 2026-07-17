import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBus, FaHistory, FaPlus, FaBars, FaTimes,
  FaSignOutAlt, FaTachometerAlt, FaSyncAlt, FaEdit, FaTrash
} from 'react-icons/fa';

const DriverTravelPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPlans = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your travel plans.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get('https://transport-2-0imo.onrender.com/api/travel/plans/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlans(res.data);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to fetch travel plans.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this travel plan?")) return;
    try {
      await axios.delete(`https://transport-2-0imo.onrender.com/api/travel/plans/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPlans();
    } catch (err) {
      console.error("Failed to delete plan:", err);
      alert("Failed to delete travel plan.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

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
            <FaHistory className="text-white text-xl" />
          </div>
          <p className="text-slate-400 text-sm">Loading travel plans…</p>
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
                  U
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
                           text-slate-400 hover:text-white hover:bg-white/5 transition-all"
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
                           bg-brand-600/15 text-brand-400 border border-brand-600/20"
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
              <h1 className="text-lg font-bold text-white">Driver Travel Plans</h1>
              <p className="text-xs text-slate-500">Add or manage your current scheduled travel plans.</p>
            </div>
          </div>

          <button
            title="Refresh plans"
            onClick={fetchPlans}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
          >
            <FaSyncAlt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </header>

        <div className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="glass-card border-red-500/20 p-4 text-center text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Create CTA Button */}
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold text-white">My Travel Plans</h2>
            <Link
              to="/travel-plans/create"
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
            >
              <FaPlus className="w-3.5 h-3.5" /> Add Travel Plan
            </Link>
          </motion.div>

          {/* plans listing */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.length === 0 ? (
              <div className="col-span-full glass-card p-12 text-center text-slate-400">
                <p className="text-4xl mb-3">📅</p>
                <p className="font-semibold text-white">No travel plans created yet</p>
                <p className="text-sm mt-1 mb-6">Create a plan to show when you will be travelling and enable bookings.</p>
                <Link
                  to="/travel-plans/create"
                  className="btn-secondary text-sm px-5 py-2"
                >
                  Create Plan
                </Link>
              </div>
            ) : (
              plans.map((plan, idx) => (
                <motion.div
                  key={plan.id || plan._id || idx}
                  className="glass-card p-6 border border-white/5 relative hover:border-brand-600/40 transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <div>
                    {/* Routes */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon" />
                      <span className="font-bold text-lg text-white">
                        {plan.origin} → {plan.destination}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="space-y-2 mb-6 text-sm text-slate-400">
                      <p>
                        <strong className="text-slate-500">Departure: </strong>
                        {plan.departure_date ? new Date(plan.departure_date).toLocaleDateString() : "No Date"}
                      </p>
                      <p>
                        <strong className="text-slate-500">Status: </strong>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          plan.approved 
                            ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}>
                          {plan.approved ? "Approved" : "Pending"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <Link
                      to={`/travel-plans/${plan.id || plan._id}/edit`}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <FaEdit className="w-3 h-3" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(plan.id || plan._id)}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                    >
                      <FaTrash className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverTravelPlans;
