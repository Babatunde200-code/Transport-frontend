import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TicketPage() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookingId = location.state?.bookingId;
  const API_BASE  = "https://transport-2-0imo.onrender.com/api";
  const token     = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!bookingId || !token) { setLoading(false); return; }
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE}/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch { } finally { setLoading(false); }
    };
    fetchBooking();
  }, [bookingId, token]);

  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ASAP Travels — Travel Ticket", 50, 20);
    doc.autoTable({
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Booking ID",     booking.id],
        ["Passenger",      booking.user?.full_name || "Passenger"],
        ["From",           booking.ride?.origin],
        ["To",             booking.ride?.destination],
        ["Seat Number",    booking.seat_number || "Assigned"],
        ["Pickup Point",   booking.pickup_location || "—"],
        ["Amount Paid",    `₦${booking.total_price}`],
        ["Status",         booking.status],
        ["Company Email",  "support@asaptravels.ng"],
        ["Website",        "https://www.asaptravels.ng"],
      ],
    });
    doc.save(`ASAP_Ticket_${booking.id}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow text-2xl">
            🎫
          </div>
          <p className="text-slate-400">Loading your ticket…</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
        <div className="glass-card p-10 max-w-sm w-full text-center">
          <p className="text-4xl mb-4">🎫</p>
          <p className="text-white font-semibold mb-2">No Booking Found</p>
          <p className="text-slate-400 text-sm mb-6">We couldn't find any booking details.</p>
          <button onClick={() => navigate("/dashboard")} className="btn-primary w-full py-3">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const TICKET_ROWS = [
    { label: "Route",           value: `${booking.ride?.origin} → ${booking.ride?.destination}` },
    { label: "Departure",       value: new Date(booking.ride?.departure_time).toLocaleString() },
    { label: "Seat Number",     value: booking.seat_number || "To be assigned" },
    { label: "Pickup Location", value: booking.pickup_location || "—" },
    { label: "Booking ID",      value: `#${booking.id}` },
    { label: "Company",         value: "ASAP Travels" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 100%)" }}
    >
      {/* Orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl relative">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Success banner */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/40 text-4xl mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            ✅
          </motion.div>
          <h1 className="text-2xl font-black text-white">Booking Confirmed!</h1>
          <p className="text-slate-400 mt-1">Your ticket is ready. Safe travels! 🚍</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          className="glass-card overflow-hidden shadow-glass-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Ticket Header */}
          <div
            className="p-6 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-black text-xs">AT</div>
                <span className="text-white font-bold text-sm">ASAP Travels</span>
              </div>
              <p className="text-blue-200 text-xs">Official Travel Ticket</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Amount Paid</p>
              <p className="text-2xl font-black text-white">₦{Number(booking.total_price).toLocaleString()}</p>
            </div>
          </div>

          {/* Perforation divider */}
          <div className="ticket-perforation relative px-6 py-4 border-y border-dashed border-white/10 bg-navy-800/50 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">From</p>
              <p className="text-white font-bold">{booking.ride?.origin}</p>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1 px-4">
              <span className="text-slate-500 text-xs">✈︎</span>
              <div className="w-full h-px border-t border-dashed border-white/20" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">To</p>
              <p className="text-white font-bold">{booking.ride?.destination}</p>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {TICKET_ROWS.map((row, i) => (
                <motion.div
                  key={i}
                  className={`${i === 0 ? "col-span-2" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{row.label}</p>
                  <p className="text-white font-semibold text-sm">{row.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-6 flex items-center justify-between pt-5 border-t border-white/5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {booking.status || "Confirmed"}
              </span>
              <a
                href="https://www.asaptravels.ng"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                asaptravels.ng ↗
              </a>
            </div>
          </div>

          {/* Download Footer */}
          <div className="px-6 pb-6">
            <motion.button
              onClick={downloadTicket}
              className="btn-primary w-full py-4 text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📥 Download Ticket (PDF)
            </motion.button>
            <p className="text-center text-slate-600 text-xs mt-3">
              A copy will also be sent to {booking.user?.email || "your email"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
