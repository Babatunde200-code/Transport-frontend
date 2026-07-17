import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaLock, FaArrowLeft } from "react-icons/fa";

export default function SignupAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/admin/signup/",
        { email, password }
      );

      setMessage(res.data.message || "Admin created successfully ✅");

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.error || "Signup failed ❌. Check credentials."
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
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              🛡️
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Admin Registration</h2>
            <p className="text-blue-200 text-sm">Create an admin account to manage ASAP Travels</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-4 py-3 rounded-xl text-sm ${
                  message.includes("successfully")
                    ? "bg-green-500/10 border border-green-500/30 text-green-400"
                    : "bg-red-500/10 border border-red-500/30 text-red-400"
                }`}
              >
                {message}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaUserShield className="text-cyan-neon" /> Email Address
              </label>
              <input
                type="email"
                placeholder="admin@asaptravels.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="dark-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FaLock className="text-cyan-neon" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="dark-input"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'Creating...' : 'Register as Admin →'}
            </motion.button>

            <p className="text-center text-slate-500 text-xs mt-4">
              Already have an admin account?{" "}
              <Link to="/admin/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

