import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBus, FaMoneyBillWave,
  FaBars, FaSyncAlt, FaTimes, FaSignOutAlt,
  FaTachometerAlt, FaTicketAlt, FaHistory
} from "react-icons/fa";

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  if (s === "paid") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/30 text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Paid
      </span>
    );
  }
  if (s === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
        Pending Payment
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/30 text-slate-400">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      {status || "Unknown"}
    </span>
  );
}

export default function MyBookings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your bookings.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://transport-2-0imo.onrender.com/api/dashboard/bookings/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.recent_bookings || [];
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };

  const parseBookingItem = (b) => {
    const bookingId = b.booking_id || b._id || b.id || "";
    const origin = b.route_from || (b.ride && (b.ride.origin || b.ride.from)) || b.origin || b.from || "Unknown";
    const destination = b.route_to || (b.ride && (b.ride.destination || b.ride.to)) || b.destination || b.to || "Unknown";
    const date = b.date || (b.ride && b.ride.departure_time) || b.created_at || b.createdAt || "";
    const amount = b.amount ?? b.total_price ?? b.price ?? b.total ?? 0;
    const status = b.status ?? b.payment_status ?? b.paymentStatus ?? "pending";
    const seatNumber = b.seat_number ?? b.seatCount ?? null;
    return { bookingId, origin, destination, date, amount, status, seatNumber };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <FaBus className="text-white text-xl" />
          </div>
          <p className="text-slate-400 text-sm">Loading your bookings…</p>
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
                           bg-brand-600/15 text-brand-400 border border-brand-600/20"
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
              <h1 className="text-lg font-bold text-white">My Bookings</h1>
              <p className="text-xs text-slate-500">View and manage all your travel bookings.</p>
            </div>
          </div>

          <button
            title="Refresh bookings"
            onClick={fetchBookings}
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

          {/* Bookings Card Container */}
          <div className="glass-card overflow-hidden">
            {bookings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🚍</p>
                <h3 className="text-xl font-bold mb-2">No Bookings Found</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  You haven't booked any trips yet. Get started on your first journey today!
                </p>
                <button
                  onClick={() => navigate("/booking")}
                  className="btn-primary text-sm px-6 py-3"
                >
                  Book a Ride Now
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["Booking ID", "Route", "Date", "Seat", "Amount", "Status", "Actions"].map((h) => (
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
                          <td className="py-4 px-6 font-mono text-sm text-slate-400">
                            #{b.bookingId.slice(-8).toUpperCase()}
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-white text-sm">
                              {b.origin}
                              <span className="text-slate-500 mx-2">→</span>
                              {b.destination}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-400">
                            {b.date ? new Date(b.date).toLocaleString() : "—"}
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
                          <td className="py-4 px-6 text-sm">
                            <div className="flex gap-2">
                              {b.status.toLowerCase() === "pending" ? (
                                <button
                                  onClick={() =>
                                    navigate("/payment", {
                                      state: {
                                        bookingId: b.bookingId,
                                        amount: b.amount,
                                      },
                                    })
                                  }
                                  className="inline-flex items-center gap-1 bg-brand-gradient text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:shadow-neon transition-all"
                                >
                                  <FaMoneyBillWave className="w-3 h-3" /> Pay Now
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    navigate("/ticket", {
                                      state: {
                                        bookingId: b.bookingId,
                                      },
                                    })
                                  }
                                  className="inline-flex items-center gap-1 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                >
                                  <FaTicketAlt className="w-3 h-3" /> View Ticket
                                </button>
                              )}
                            </div>
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
      </main>
    </div>
  );
}
