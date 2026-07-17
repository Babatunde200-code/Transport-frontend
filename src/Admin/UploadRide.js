import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaUsers, FaPlus, FaSignOutAlt } from "react-icons/fa";
import API from "../api";

export default function UploadRide() {
  const [ride, setRide] = useState({
    origin: "",
    destination: "",
    departure_time: "",
    price: "",
    total_seats: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // FULL FIXED RIDE DATA SCHEMA
      const rideData = {
        origin: ride.origin.trim(),
        destination: ride.destination.trim(),
        departure_time: new Date(ride.departure_time).toISOString(),
        price: Number(ride.price),
        total_seats: Number(ride.total_seats),
        available_seats: Number(ride.total_seats),  // SAME AS TOTAL
        booked_seats: [], // IMPORTANT FOR seat selection display
      };

      await API.post("/api/admin/rides/", rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Ride created successfully!");

      setRide({
        origin: "",
        destination: "",
        departure_time: "",
        price: "",
        total_seats: "",
      });

    } catch (err) {
      console.error("Ride creation failed:", err.response?.data || err);
      alert(
        `Failed to create ride: ${
          err.response?.data?.error || "Something went wrong"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-navy-900 text-white relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-neon/8 blur-[100px] pointer-events-none" />

      {/* Admin header */}
      <header className="w-full bg-navy-900/90 backdrop-blur-xl border-b border-white/5 shadow-glass z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-brand">
              AD
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              ASAP Travels <span className="text-red-500 text-xs ml-1 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/25">ADMIN</span>
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm font-semibold transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      {/* Body form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-lg relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card overflow-hidden">
            <div
              className="p-6 text-center"
              style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
                🚍
              </div>
              <h2 className="text-2xl font-black text-white mb-1">Create & Upload Ride</h2>
              <p className="text-blue-200 text-sm">Add a new schedule for traveler bookings</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-cyan-neon" /> Origin City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagos"
                  value={ride.origin}
                  onChange={(e) => setRide({ ...ride, origin: e.target.value })}
                  className="dark-input"
                  required
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-brand-400" /> Destination City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Abuja"
                  value={ride.destination}
                  onChange={(e) => setRide({ ...ride, destination: e.target.value })}
                  className="dark-input"
                  required
                />
              </div>

              {/* Departure Time */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-cyan-neon" /> Departure Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={ride.departure_time}
                  onChange={(e) =>
                    setRide({ ...ride, departure_time: e.target.value })
                  }
                  className="dark-input"
                  required
                />
              </div>

              {/* Grid: Price and Seats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <FaMoneyBillWave className="text-brand-400" /> Fare (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={ride.price}
                    onChange={(e) => setRide({ ...ride, price: e.target.value })}
                    className="dark-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <FaUsers className="text-cyan-neon" /> Total Seats
                  </label>
                  <input
                    type="number"
                    placeholder="Seats"
                    value={ride.total_seats}
                    onChange={(e) =>
                      setRide({ ...ride, total_seats: e.target.value })
                    }
                    className="dark-input"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? "Creating..." : (
                  <>
                    Create Ride <FaPlus className="w-3.5 h-3.5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

