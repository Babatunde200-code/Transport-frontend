import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaSave } from "react-icons/fa";

export default function EditTravelPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Please log in to edit travel plans.");
      setLoading(false);
      return;
    }

    const fetchPlanDetails = async () => {
      try {
        const res = await axios.get(`https://transport-2-0imo.onrender.com/api/travel/plans/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Set values and convert date to YYYY-MM-DD for input field
        const plan = res.data;
        let formattedDate = "";
        if (plan.departure_date) {
          formattedDate = plan.departure_date.split("T")[0];
        }
        setFormData({
          origin: plan.origin || "",
          destination: plan.destination || "",
          departure_date: formattedDate,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch travel plan details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.put(
        `https://transport-2-0imo.onrender.com/api/travel/plans/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Travel plan updated successfully!");
      setTimeout(() => navigate("/travel-plans"), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Failed to update travel plan. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl brand-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-slate-400 text-sm">Loading plan details...</p>
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
              ✍️
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Edit Travel Plan</h2>
            <p className="text-blue-200 text-sm">Modify scheduled trip details</p>
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
                  Updating...
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
}
