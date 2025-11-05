import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaPlaneDeparture, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const [showOffer, setShowOffer] = useState(false);
  const isAdmin = localStorage.getItem("is_staff") === "true";

  // 🎯 Show promo only once per session
  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem("hasSeenOffer");
    if (!hasSeenOffer) {
      setTimeout(() => setShowOffer(true), 1000);
      sessionStorage.setItem("hasSeenOffer", "true");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* 🌍 Hero Section with Background Video */}
        <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
          {/* ✅ Working Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="https://videos.pexels.com/video-files/3129702/3129702-uhd_3840_2160_25fps.mp4"
          />

          {/* 🏠 Hero Content */}
          <motion.div
            className="relative z-10 bg-black bg-opacity-50 p-10 rounded-xl text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Seamless Interstate Travel Bookings
            </h1>
            <p className="mb-6 text-lg">
              Connect with verified drivers. Book rides easily. Travel safely
              across Nigeria.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        </section>

        {/* 🧭 About Us Section */}
        <section className="py-20 px-6 bg-blue-50">
          <motion.div
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1606299747068-ea8669f678b8?q=80&w=1470&auto=format&fit=crop"
              alt="About Us"
              className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-700">
                About Us
              </h2>
              <p className="text-lg leading-relaxed">
                <strong>ASAP Travels</strong> connects travelers with verified
                drivers for safe, affordable, and flexible interstate journeys.
                Whether you’re traveling for business, school, or leisure,
                we’re here to make your trip stress-free and reliable.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 🚗 Popular Routes Section */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-700">
            Popular Routes
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                route: "Ife → Ibadan",
                price: "₦5,150",
                duration: "2h 15m",
                image:
                  "https://images.unsplash.com/photo-1597076537024-193fb8a4cf9c?q=80&w=1470&auto=format&fit=crop",
              },
              {
                route: "Ibadan → Lagos",
                price: "₦10,100",
                duration: "2h 45m",
                image:
                  "https://images.unsplash.com/photo-1604079628040-d1b60c3a9a41?q=80&w=1470&auto=format&fit=crop",
              },
              {
                route: "Lagos → Ife",
                price: "₦10,100",
                duration: "3h 00m",
                image:
                  "https://images.unsplash.com/photo-1578762170131-8be0b4fd25ce?q=80&w=1470&auto=format&fit=crop",
              },
            ].map((trip, i) => (
              <motion.div
                key={i}
                className="rounded-xl shadow-lg overflow-hidden bg-blue-50"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 + i * 0.2 }}
              >
                <img
                  src={trip.image}
                  alt={trip.route}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    {trip.route}
                  </h3>
                  <p className="text-gray-600 mb-2">Duration: {trip.duration}</p>
                  <p className="text-lg font-semibold">{trip.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ⚓ Footer */}
        <footer className="bg-blue-900 text-white py-6 text-center text-sm">
          &copy; {new Date().getFullYear()} ASAP TRAVELS. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
