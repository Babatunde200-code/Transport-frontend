import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";

export default function CreateTravelPlan() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be authenticated to create a travel plan.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://transport-2-0imo.onrender.com/api/travel/plans/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Travel plan created successfully!");
      setTimeout(() => navigate("/travel-plans"), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Failed to create travel plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          onClick={() => navigate("/travel-plans")}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" /> Back to Travel Plans
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              🗺️
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Create Travel Plan</h2>
            <p className="text-blue-200 text-sm">Schedule a new trip as a driver</p>
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

            {/* Origin */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-cyan-neon" /> Origin City
              </label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. Lagos"
                required
                className="dark-input"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-brand-400" /> Destination City
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Abuja"
                required
                className="dark-input"
              />
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-cyan-neon" /> Departure Date
              </label>
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
                required
                className="dark-input"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                <>
                  Create Plan <FaPaperPlane className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
