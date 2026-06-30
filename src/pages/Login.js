import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import parkImage from "../assets/park1.jpg";
import GoogleAuthButton from "../components/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/login/",
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-navy-900">

      {/* ── LEFT PANEL ───────────────────────────────────── */}
      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center"
        style={{
          backgroundImage: `url(${parkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: "linear-gradient(135deg, #0A0E2A 0%, #1E3A8A55 100%)" }}
        />

        <div className="relative z-10 text-center px-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl brand-gradient-bg flex items-center justify-center font-black text-2xl shadow-neon mx-auto mb-6">
              AT
            </div>
            <h1 className="text-4xl font-black text-white mb-3">
              Welcome Back!
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
              Sign in to manage your bookings and travel across Nigeria effortlessly.
            </p>
          </motion.div>

          {/* Feature pills */}
          {["🚍 Comfortable Rides", "⏱ Always On-Time", "🛡️ Insured & Safe"].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="inline-flex items-center gap-2 glass-card-light px-4 py-2 text-sm text-white m-1"
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ──────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-navy-900">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-10">
            <div className="md:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-xl brand-gradient-bg flex items-center justify-center font-black text-xs shadow-brand">AT</div>
              <span className="text-lg font-bold"><span className="gradient-text">ASAP</span> Travels</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Sign In</h2>
            <p className="text-slate-400">Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Create one free →
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                placeholder="you@example.com"
                className="dark-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="••••••••"
                  className="dark-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-brand-600 rounded"
                />
                Keep me signed in
              </label>
              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <GoogleAuthButton text="Sign in with Google" />

          <p className="text-center text-slate-600 text-xs mt-8">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
            {" & "}
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
