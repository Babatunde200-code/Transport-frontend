import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Book Ride",to: "/booking" },
  { label: "Contact",  to: "/contact" },
];

const WHY_CARDS = [
  {
    icon: "🚍",
    title: "Modern & Comfortable",
    desc: "Spacious, air-conditioned vehicles with premium seating for a relaxing journey.",
    color: "from-blue-600/20 to-indigo-600/10",
    border: "border-blue-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
  },
  {
    icon: "🕒",
    title: "On-Time Departures",
    desc: "We respect your schedule. Every departure leaves exactly on time, every time.",
    color: "from-violet-600/20 to-purple-600/10",
    border: "border-violet-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]",
  },
  {
    icon: "🛡️",
    title: "Safe & Insured Travel",
    desc: "Every ride is tracked, insured and monitored by our 24/7 safety operations team.",
    color: "from-cyan-500/20 to-sky-600/10",
    border: "border-cyan-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
  },
];

const FEATURES = [
  { icon: "🏠", title: "Home Pickup", text: "Get picked up right at your doorstep." },
  { icon: "⚡", title: "Fast Booking",  text: "Book your seat in under 60 seconds." },
  { icon: "💺", title: "Comfort Ride", text: "Clean, spacious & air-conditioned." },
  { icon: "📍", title: "GPS Tracking", text: "Track your ride in real-time, always." },
];

const STATS = [
  { value: "50K+", label: "Happy Passengers" },
  { value: "200+", label: "Routes Available" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    var script = document.createElement("script");
    script.src = "https://embed.tawk.to/692010955148001960c52574/1jaik1itg";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-screen bg-navy-900 text-white overflow-x-hidden">

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <motion.header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-900/90 backdrop-blur-xl border-b border-white/5 shadow-glass"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center text-white font-black text-sm shadow-brand">
              AT
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">ASAP</span>
              <span className="text-white ml-1">Travels</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate("/login")}
              className="hidden md:block btn-primary text-sm px-5 py-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Ride
            </motion.button>
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-navy-900/95 backdrop-blur-xl border-t border-white/5"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-300 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="btn-primary text-sm mt-2"
            >
              Book a Ride
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 50%, #0F1535 100%)" }}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-neon/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-800/10 blur-[160px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
          {/* Left — Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm font-medium text-cyan-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-slow" />
              Nigeria's #1 Interstate Travel Platform
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Travel Smarter<br />
              <span className="gradient-text">Across Cities</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl font-light max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              Affordable interstate rides anytime. Connecting travelers, making
              every trip safer, faster, and stress-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => navigate("/login")}
                className="btn-primary text-base px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Book a Ride Now
              </motion.button>
              <motion.button
                onClick={() => navigate("/signup")}
                className="btn-secondary text-base px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Free Account
              </motion.button>
            </div>

            {/* Mini stats row */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-12">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-2xl font-black gradient-text">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Hero image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-brand-gradient opacity-20 blur-2xl scale-110" />
              <div className="relative glass-card p-2 rounded-3xl overflow-hidden shadow-glass-lg">
                <img
                  src="/asap.png"
                  alt="ASAP Travels Interstate Vehicle"
                  className="w-full max-w-sm md:max-w-md rounded-2xl object-cover"
                />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                className="absolute -top-4 -right-4 glass-card px-4 py-3 text-center shadow-cyan"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-2xl font-black text-cyan-400">50K+</p>
                <p className="text-xs text-slate-400">Happy Passengers</p>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="absolute -bottom-4 -left-4 glass-card px-4 py-3 text-center shadow-brand"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <p className="text-2xl font-black gradient-text">4.9 ★</p>
                <p className="text-xs text-slate-400">Avg. Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#0A0E2A" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-brand-600/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-5">
              WHY NIGERIANS CHOOSE US
            </span>
            <h2 className="section-heading mb-4">
              The <span className="gradient-text">ASAP Travels</span> Difference
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
              We make interstate travel fast, safe, and stress-free — every single time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {WHY_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-default bg-gradient-to-br ${card.color} ${card.border} ${card.glow}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <div className="text-5xl mb-5">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ──────────────────────────────────── */}
      <section className="py-28 relative" style={{ background: "linear-gradient(180deg, #0A0E2A 0%, #0F1535 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-brand-400 bg-brand-600/10 border border-brand-600/20 mb-5">
              FEATURES
            </span>
            <h2 className="section-heading mb-16">
              Why Travel <span className="gradient-text">With Us?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                className="glass-card p-7 text-center hover:border-brand-600/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <p className="text-base font-bold text-white mb-2">{f.title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: "linear-gradient(135deg, #1E3A8A, #3B5BDB, #0891B2, #3B5BDB, #1E3A8A)",
            backgroundSize: "300% 300%",
          }}
        />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Ready to Travel Smarter?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join 50,000+ Nigerians who trust ASAP Travels for every trip.
            </p>
            <motion.button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-10 py-4 rounded-xl shadow-xl text-lg hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started — It's Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ background: "#04071A" }} className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center font-black text-sm shadow-brand">
                  AT
                </div>
                <span className="text-xl font-bold">
                  <span className="gradient-text">ASAP</span>
                  <span className="text-white ml-1">Travels</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nigeria's most trusted interstate transportation platform.
                Safe, comfortable, and always on time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  📞 <a href="tel:+2349033692772" className="hover:text-cyan-400 transition-colors">+234 9033692772</a>
                </p>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  ✉️ <a href="mailto:support@asaptravels.ng" className="hover:text-cyan-400 transition-colors">support@asaptravels.ng</a>
                </p>
                <p className="text-slate-400 text-sm">🌐 www.asaptravels.ng</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} ASAP Travels. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-600 text-xs">
              <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
