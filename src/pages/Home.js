import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var script = document.createElement("script");
    script.src = "https://embed.tawk.to/692010955148001960c52574/1jaik1itg";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">

      {/* NAVBAR WITH ANIMATION */}
      <motion.header
        className="w-full bg-white shadow-sm fixed top-0 left-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3348A2]">ASAP Travels</h1>

          <nav className="hidden md:flex gap-10 text-[#3348A2] font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/book">Book Ride</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>

          <button
            className="md:hidden text-[#3348A2] text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white px-6 pb-4 space-y-3 text-[#3348A2] font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/book">Book Ride</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        )}
      </motion.header>

      {/* HERO SECTION */}
      <section className="pt-36 md:pt-40 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-8">

        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#3348A2] leading-tight">
            Travel Smarter Across Cities
          </h1>

          <p className="mt-4 text-lg md:text-2xl text-gray-700 font-light">
            Affordable Interstate Rides, Anytime.
          </p>
          <p className="mt-1 text-gray-600 md:text-lg">
            Connecting Travelers, Making Trips Easier.
          </p>

          <motion.button
            onClick={() => navigate("/login")}
            className="mt-8 px-8 py-3 bg-[#3348A2] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Ride
          </motion.button>
        </motion.div>

        {/* HERO IMAGE WITH SMOOTH ZOOM-IN */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/asap.png"
            alt="Interstate Vehicle"
            className="w-full max-w-md rounded-2xl object-cover shadow-md"
          />
        </motion.div>
      </section>

      {/* WHY NIGERIANS CHOOSE US (ANIMATED CARDS) */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-extrabold text-[#3348A2] mb-4">
          Why Nigerians Choose ASAP Travels
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          We make interstate travel fast, safe, and stress-free.
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {[
            { icon: "🚍", title: "Modern & Comfortable Buses", desc: "Clean and spacious vehicles." },
            { icon: "🕒", title: "On-Time Departures", desc: "No unexpected delays." },
            { icon: "🛡️", title: "Safe & Secure Travel", desc: "Trusted and insured rides." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-8 rounded-2xl shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES WITH STAGGER ANIMATION */}
      <section className="py-20 bg-[#f4f6ff] text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2]">Why Travel With Us?</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {[
            { title: "Home Pickup", text: "Convenient pickup." },
            { title: "Fast Booking", text: "Seamless process." },
            { title: "Comfort Ride", text: "Clean & comfortable." },
            { title: "GPS Tracking", text: "Real-time tracking." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 border rounded-xl shadow-sm bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <p className="text-lg font-semibold mb-3">{feature.title}</p>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3348A2] text-white text-center py-10">
        <p className="text-lg font-semibold">We are available 24/7 — Book anytime!</p>
        <p className="text-3xl font-bold my-4">+234 9033692772</p>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} ASAP Travels
        </p>
      </footer>
    </div>
  );
}
