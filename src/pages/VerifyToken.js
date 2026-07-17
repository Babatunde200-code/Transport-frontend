import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaPaperPlane } from "react-icons/fa";

const Verify = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/verify/",
        {
          email: formData.email,
          code: formData.code,
        }
      );
      setSuccess(res.data.message || "Account verified successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Verification failed. Please check the code and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }

    setError("");
    setSuccess("");
    setResending(true);

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/resend-code/",
        { email: formData.email }
      );
      setSuccess(res.data.message || "A new code has been sent to your email.");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Failed to resend code."
      );
    } finally {
      setResending(false);
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
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              🔑
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Verify Account</h2>
            <p className="text-blue-200 text-sm">Enter the code sent to your email address</p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleVerify} className="p-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm"
              >
                ✅ {success}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                className="dark-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Verification Code */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaShieldAlt className="text-cyan-neon" /> 6-Digit Code
              </label>
              <input
                type="text"
                name="code"
                className="dark-input font-mono text-center tracking-[0.25em] text-lg"
                value={formData.code}
                onChange={handleChange}
                required
                placeholder="000000"
                maxLength={6}
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
              {loading ? "Verifying..." : "Verify Account →"}
            </motion.button>

            {/* Resend button */}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-200 border border-white/5 text-sm font-medium flex items-center justify-center gap-2"
            >
              {resending ? "Resending..." : (
                <>
                  Resend Code <FaPaperPlane className="w-3 h-3 text-cyan-neon" />
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-xs mt-4">
              Back to{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Verify;
