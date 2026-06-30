import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBus, FaMoneyBillWave, FaHistory, FaClock,
  FaBars, FaSyncAlt, FaPlus, FaTimes, FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

/* ── Sub-components ─────────────────────────────────────────── */

function SummaryCard({ icon, label, value, gradient, delay = 0 }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl p-6 text-white ${gradient}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3 }}
    >
      {/* Background orb */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />

      <div className="relative">
        <div className="text-3xl mb-3 opacity-90">{icon}</div>
        <p className="text-sm font-medium text-white/70 mb-1">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const classes =
    s === "paid"
      ? "bg-green-500/15 text-green-400 border-green-500/30"
      : s === "pending"
      ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
      : "bg-slate-500/15 text-slate-400 border-slate-500/30";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${classes}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status || "—"}
    </span>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export default function UserDashboard() {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [pendingPaymentsList, setPendingPaymentsList] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState("");

  const parseBookingItem = (b) => {
    const bookingId    = b.booking_id || b._id || b.id || "";
    const origin       = b.route_from || (b.ride && (b.ride.origin || b.ride.from)) || b.origin || b.from || "Unknown";
    const destination  = b.route_to || (b.ride && (b.ride.destination || b.ride.to)) || b.destination || b.to || "Unknown";
    const date         = b.date || (b.ride && b.ride.departure_time) || b.created_at || b.createdAt || "";
    const amount       = b.amount ?? b.total_price ?? b.price ?? b.total ?? 0;
    const status       = b.status ?? b.payment_status ?? b.paymentStatus ?? "pending";
    const seatNumber   = b.seat_number ?? b.seatCount ?? null;
    return { bookingId, origin, destination, date, amount, status, seatNumber };
  };

  const fetchDashboardData = useCallback(async () => {
    const authHeader = token ? { Authorization: `Bearer ${token}` } : null;
    setLoading(true);
    setError("");
    if (!token) { setError("Not authenticated. Please login."); setLoading(false); return; }
    try {
      const [bRes, pRes, pendingRes] = await Promise.all([
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/bookings/",         { headers: authHeader }),
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/payments/",         { headers: authHeader }),
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/payments/pending/", { headers: authHeader }),
      ]);
      setBookings(Array.isArray(bRes.data) ? bRes.data : bRes.data.recent_bookings || []);
      setPayments(Array.isArray(pRes.data) ? pRes.data : pRes.data.payments || []);
      setPendingPaymentsList(Array.isArray(pendingRes.data) ? pendingRes.data : pendingRes.data.pending || []);
    } catch {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  const totalTrips           = bookings.length;
  const totalPaymentsAmount  = payments.reduce((sum, p) => {
    const v = Number(p.amount ?? p.total ?? p.price ?? 0);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);
  const totalPendingCount    = pendingPaymentsList.length;

  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <FaTachometerAlt className="text-white text-xl" />
          </div>
          <p className="text-slate-400 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-navy-900">

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
            {/* Logo */}
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

            {/* Profile */}
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

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium
                           bg-brand-600/15 text-brand-400 border border-brand-600/20"
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
                           text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <FaHistory className="w-4 h-4" />
                Travel Plans
              </Link>
            </nav>

            {/* Logout */}
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

        {/* Top bar */}
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
              <h1 className="text-lg font-bold text-white">Dashboard</h1>
              <p className="text-xs text-slate-500">Welcome back! Here's your overview.</p>
            </div>
          </div>

          <button
            title="Refresh data"
            onClick={fetchDashboardData}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
          >
            <FaSyncAlt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </header>

        <div className="p-6 md:p-8 space-y-8">

          {/* ── Summary Cards ─────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon={<FaBus />}
              label="Total Trips"
              value={totalTrips}
              gradient="bg-gradient-to-br from-brand-600 to-indigo-700"
              delay={0}
            />
            <SummaryCard
              icon={<FaMoneyBillWave />}
              label="Total Spent"
              value={`₦${totalPaymentsAmount.toLocaleString()}`}
              gradient="bg-gradient-to-br from-emerald-600 to-teal-700"
              delay={0.1}
            />
            <SummaryCard
              icon={<FaClock />}
              label="Pending Payments"
              value={totalPendingCount}
              gradient="bg-gradient-to-br from-orange-500 to-amber-600"
              delay={0.2}
            />
            <SummaryCard
              icon={<FaHistory />}
              label="Travel History"
              value={`${totalTrips} Records`}
              gradient="bg-gradient-to-br from-violet-600 to-purple-700"
              delay={0.3}
            />
          </div>

          {/* ── Book a Ride CTA ────────────────────── */}
          <motion.button
            onClick={() => navigate("/booking")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base shadow-brand transition-all duration-300 hover:shadow-neon"
            style={{ background: "linear-gradient(135deg, #3B5BDB 0%, #00D4FF 100%)" }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <FaPlus className="w-4 h-4" />
            Book a New Ride
          </motion.button>

          {/* ── Error ─────────────────────────────── */}
          {error && (
            <div className="glass-card border-red-500/20 p-4 text-center text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* ── Recent Bookings ────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
              <Link to="/my-bookings" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                View all →
              </Link>
            </div>

            <div className="glass-card overflow-hidden">
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">🚍</p>
                  <p className="text-slate-400">No bookings yet.</p>
                  <button
                    onClick={() => navigate("/booking")}
                    className="mt-4 btn-primary text-sm px-5 py-2"
                  >
                    Book Your First Ride
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        {["Route", "Date", "Seat", "Amount", "Status"].map((h) => (
                          <th key={h} className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((raw, idx) => {
                        const b = parseBookingItem(raw);
                        return (
                          <motion.tr
                            key={b.bookingId || idx}
                            className="border-b border-white/5 hover:bg-white/3 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04 }}
                          >
                            <td className="py-4 px-6">
                              <span className="font-medium text-white text-sm">
                                {b.origin}
                                <span className="text-slate-500 mx-1.5">→</span>
                                {b.destination}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-400">
                              {b.date ? new Date(b.date).toLocaleDateString() : "—"}
                            </td>
                            <td className="py-4 px-6 text-sm text-slate-400">
                              {b.seatNumber ? `Seat ${b.seatNumber}` : "—"}
                            </td>
                            <td className="py-4 px-6 text-sm font-semibold text-white">
                              ₦{(Number(b.amount) || 0).toLocaleString()}
                            </td>
                            <td className="py-4 px-6">
                              <StatusBadge status={b.status} />
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ── Recent Payments ─────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Recent Payments</h2>
            </div>

            <div className="glass-card p-0 overflow-hidden">
              {payments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">💳</p>
                  <p className="text-slate-400">No payments recorded yet.</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {payments.map((p, i) => (
                    <motion.li
                      key={p.payment_id ?? p._id ?? i}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                          <FaMoneyBillWave className="text-emerald-400 w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            ₦{Number(p.amount ?? p.total ?? p.price ?? 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            Txn: {p.transaction_id ?? "—"}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={p.status ?? "paid"} />
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
