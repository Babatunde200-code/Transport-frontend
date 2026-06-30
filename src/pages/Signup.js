import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import parkImage from "../assets/park.jpg";
import asapLogo from "../assets/Asap_logo.png";
import GoogleAuthButton from "../components/GoogleAuthButton";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://transport-2-0imo.onrender.com/api/signup/", {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });
      setSuccess("Account created! Please check your email to verify.");
      setTimeout(() => navigate("/verify"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat().join(", ") ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Too short", color: "bg-red-500", width: "w-1/4" };
    if (p.length < 10) return { label: "Weak", color: "bg-orange-500", width: "w-2/4" };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: "Fair", color: "bg-yellow-500", width: "w-3/4" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
  };
  const strength = passwordStrength();

  return (
    <div className="min-h-screen flex bg-navy-900">

      {/* ── LEFT PANEL ─────────────────────────────── */}
      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center"
        style={{
          backgroundImage: `url(${parkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy-900/65 backdrop-blur-sm" />
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: "linear-gradient(135deg, #0A0E2A 0%, #1E3A8A55 100%)" }}
        />

        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card-light p-8 rounded-3xl inline-block mb-8">
              <img src={asapLogo} alt="ASAP Travels Logo" className="w-40" />
            </div>
            <h2 className="text-4xl font-black text-white mb-3">
              Join ASAP Travels
            </h2>
            <p className="text-slate-300 text-lg max-w-sm">
              Create your free account and start booking interstate rides across Nigeria instantly.
            </p>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {["50K+ Users", "200+ Routes", "Free to Join"].map((s, i) => (
              <span key={i} className="glass-card-light px-4 py-2 text-sm text-white">
                ✅ {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-navy-900 overflow-y-auto">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="md:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-xl brand-gradient-bg flex items-center justify-center font-black text-xs shadow-brand">AT</div>
              <span className="text-lg font-bold"><span className="gradient-text">ASAP</span> Travels</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Sign in →
              </Link>
            </p>
          </div>

          {/* Error / Success */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl mb-5 text-sm"
            >
              <span>✅</span> {success}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email */}
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

            {/* Password */}
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
                  placeholder="Create a strong password"
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
              {/* Strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-navy-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                  <p className={`text-xs mt-1 ${strength.color.replace("bg-", "text-")}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  placeholder="Repeat your password"
                  className={`dark-input pr-12 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "border-red-500/50 focus:border-red-500"
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? "border-green-500/50 focus:border-green-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-400 mt-1">✓ Passwords match</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : "Create My Account →"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <GoogleAuthButton text="Sign up with Google" />

          <p className="text-center text-slate-600 text-xs mt-6">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
            {" & "}
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
