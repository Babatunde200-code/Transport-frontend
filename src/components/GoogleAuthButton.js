import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";

export default function GoogleAuthButton({ text = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("email", user.email);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      alert("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3.5 px-4
                 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium
                 hover:bg-white/10 hover:border-white/20 transition-all duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed"
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.99 }}
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5"
        />
      )}
      {loading ? "Connecting…" : text}
    </motion.button>
  );
}
