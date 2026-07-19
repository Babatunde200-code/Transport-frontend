import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, ShieldCheck } from "lucide-react";

export default function ReviewBookingPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API_BASE = "https://transport-2-0imo.onrender.com/api";
  const bookingId = location.state?.bookingId;

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID found.");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE}/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-slate-400">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
        <div className="glass-card p-10 max-w-sm w-full text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={() => navigate("/booking")} className="btn-primary w-full py-3 mt-4">
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-navy-900"
      style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-neon/8 blur-[100px] pointer-events-none" />

      <motion.div
        className="w-full max-w-xl relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              📋
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Review Your Booking</h2>
            <p className="text-blue-200 text-sm">Please verify details before proceeding to payment</p>
          </div>

          {/* Details Body */}
          <div className="p-8 space-y-6">
            {/* Route */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">From</p>
                <p className="text-lg font-bold text-white">{booking?.ride?.origin}</p>
              </div>
              <div className="flex flex-col items-center flex-1 px-4 text-slate-500">
                <span className="text-xs">🚍</span>
                <div className="w-full h-px border-t border-dashed border-white/20 my-1" />
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">To</p>
                <p className="text-lg font-bold text-white">{booking?.ride?.destination}</p>
              </div>
            </div>

            {/* Meta Table */}
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-400" /> Departure Time
                </span>
                <span className="text-white font-medium">
                  {booking?.ride?.departure_time
                    ? new Date(booking.ride.departure_time).toLocaleString()
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                <span className="text-slate-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-400" /> Seat Number
                </span>
                <span className="text-white font-mono font-bold bg-navy-800 border border-white/10 px-3 py-1 rounded-lg">
                  Seat {booking?.seat_number || "Assigned"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                <span className="text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400" /> Booking Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    booking?.status === "paid"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {booking?.status}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="text-brand-400 font-bold">₦</span> Trip Price
                </span>
                <span className="text-white font-bold">
                  ₦{Number(booking?.total_price || booking?.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Price */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "linear-gradient(135deg, rgba(59,91,219,0.15) 0%, rgba(0,212,255,0.05) 100%)", border: "1px solid rgba(59,91,219,0.2)" }}
            >
              <p className="text-slate-400 text-sm mb-1">Total Trip Fare</p>
              <p className="text-4xl font-black gradient-text">
                ₦{(booking?.total_price || 0).toLocaleString()}
              </p>
            </div>

            {/* Checkout CTA */}
            <motion.button
              onClick={() =>
                navigate("/payment", {
                  state: {
                    bookingId: bookingId,
                    amount: booking.total_price,
                  },
                })
              }
              className="w-full py-4 font-bold text-base text-white rounded-xl transition-all duration-300 hover:shadow-neon hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #3B5BDB 0%, #00D4FF 100%)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Payment <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

