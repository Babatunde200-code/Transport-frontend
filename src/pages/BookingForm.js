import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export default function BookingForm() {
  const [rides,         setRides]         = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [seatNumber,    setSeatNumber]    = useState({});
  const [message,       setMessage]       = useState({ text: "", type: "" });
  const [searchQuery,   setSearchQuery]   = useState("");
  const [bookingRide,   setBookingRide]   = useState(null); // which rideId is being booked

  const token    = localStorage.getItem("token");
  const API_BASE = "https://transport-2-0imo.onrender.com/api";
  const navigate = useNavigate();

  const fetchRides = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/rides/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRides(res.data);
      setFilteredRides(res.data);
    } catch {
      setMessage({ text: "Failed to load rides. Please refresh.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [API_BASE, token]);

  useEffect(() => { fetchRides(); }, [fetchRides]);

  useEffect(() => {
    if (!searchQuery.trim()) return setFilteredRides(rides);
    const q = searchQuery.toLowerCase();
    setFilteredRides(
      rides.filter(
        (r) =>
          r.origin.toLowerCase().includes(q) ||
          r.destination.toLowerCase().includes(q)
      )
    );
  }, [searchQuery, rides]);

  const bookRide = async (rideId) => {
    const seat = seatNumber[rideId];
    if (!seat) {
      setMessage({ text: "Please select a seat number before booking.", type: "error" });
      return;
    }
    setBookingRide(rideId);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(
        `${API_BASE}/rides/${rideId}/book/`,
        { seat_number: seat },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: "Booking successful! Redirecting…", type: "success" });
      setTimeout(() => navigate("/review-booking", { state: { bookingId: res.data.booking_id } }), 1200);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Booking failed. Please try again.",
        type: "error",
      });
    } finally {
      setBookingRide(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-2xl">🚍</span>
          </div>
          <p className="text-slate-400">Loading available rides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-24">

      {/* ── HERO / SEARCH BAR ─────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 60%, #0F1535 100%)" }}
      >
        {/* Orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-neon/8 blur-[100px] pointer-events-none" />

        {/* Back button */}
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
        </div>

        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-5">
              🚀 BOOK YOUR RIDE
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Find Your <span className="gradient-text">Perfect Ride</span>
            </h1>
            <p className="text-slate-400 mb-10 text-lg">
              Browse available interstate routes and book your seat instantly.
            </p>

            {/* Search input */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by city or destination…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder-slate-500
                           rounded-2xl py-4 pl-14 pr-5 text-base outline-none
                           focus:border-brand-600/60 focus:ring-2 focus:ring-brand-600/20 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Result count */}
            <p className="text-slate-500 text-sm mt-4">
              {filteredRides.length} ride{filteredRides.length !== 1 ? "s" : ""} available
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MESSAGE ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`my-6 p-4 text-center rounded-xl font-medium text-sm ${
                message.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {message.type === "success" ? "✅" : "⚠️"} {message.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RIDES GRID ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {filteredRides.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-white font-semibold text-lg">No rides found</p>
            <p className="text-slate-500 mt-2">Try a different city or destination</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride, idx) => {
              const availableSeats = Array.from(
                { length: ride.total_seats },
                (_, i) => i + 1
              ).filter((s) => !ride.booked_seats.includes(s));

              const isBusy = bookingRide === ride._id;

              return (
                <motion.div
                  key={ride._id}
                  className="glass-card overflow-hidden hover:border-brand-600/40 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Image */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src="/bus1.jpeg"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Bus"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                    {/* Seat availability badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      availableSeats.length > 5
                        ? "bg-green-500/20 border border-green-500/40 text-green-400"
                        : availableSeats.length > 0
                        ? "bg-orange-500/20 border border-orange-500/40 text-orange-400"
                        : "bg-red-500/20 border border-red-500/40 text-red-400"
                    }`}>
                      {availableSeats.length > 0 ? `${availableSeats.length} seats left` : "Full"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Route */}
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <h3 className="text-lg font-bold text-white">
                        {ride.origin}
                        <span className="text-slate-500 mx-2">→</span>
                        {ride.destination}
                      </h3>
                    </div>

                    {/* Meta */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4 text-brand-400" />
                        <span>{new Date(ride.departure_time).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Users className="w-4 h-4 text-brand-400" />
                        <span>{availableSeats.length} of {ride.total_seats} seats available</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Price</p>
                        <p className="text-2xl font-black gradient-text">₦{Number(ride.price).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Seat selector + Book */}
                    <div className="flex gap-3">
                      <select
                        value={seatNumber[ride._id] || ""}
                        onChange={(e) =>
                          setSeatNumber((prev) => ({ ...prev, [ride._id]: Number(e.target.value) }))
                        }
                        disabled={availableSeats.length === 0}
                        className="flex-1 bg-navy-800 border border-white/10 text-white rounded-xl px-3 py-2.5 text-sm
                                   outline-none focus:border-brand-600/60 transition-colors disabled:opacity-40"
                      >
                        <option value="">Select Seat</option>
                        {availableSeats.map((seat) => (
                          <option key={seat} value={seat}>Seat {seat}</option>
                        ))}
                      </select>

                      <motion.button
                        onClick={() => bookRide(ride._id)}
                        disabled={availableSeats.length === 0 || isBusy}
                        className="btn-primary px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                        whileHover={{ scale: availableSeats.length > 0 && !isBusy ? 1.05 : 1 }}
                        whileTap={{ scale: availableSeats.length > 0 && !isBusy ? 0.95 : 1 }}
                      >
                        {isBusy ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <span className="flex items-center gap-1">
                            Book <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
