import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaUserFriends,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const isAdmin = localStorage.getItem("is_staff") === "true"; // ✅ check role
  const [showOffer, setShowOffer] = useState(false);
  const navigate = useNavigate();

  // ✅ Show promo popup on page load
  useEffect(() => {
    setShowOffer(true);
  }, []);

  return (
    <>
      <Navbar />

      {/* 🚐 Launch Offer Modal */}
      {showOffer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-lg p-8 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              🚐 ASAP Travels – Special Launch Offer 🚐
            </h2>
            <p className="text-gray-700 mb-4">
              We are pleased to announce that <strong>ASAP Travels</strong> is
              offering <span className="text-blue-600 font-semibold">50% discount on travel </span> 
              for the first set of passengers booking their trip from <b>Ife to Ibadan</b>.
            </p>
            <p className="text-gray-600 mb-2">
              This limited-time offer is our way of introducing you to our service and
              ensuring you experience the comfort and reliability we stand for.
            </p>
            <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
              <li>📌 Limited seats available – first-come, first-served.</li>
              <li>📌 Fill out the form below to secure your spot.</li>
            </ul>
            <p><strong>N.B - This offer is only for fridays, other days are in full payment. and this runs for a whole month</strong></p>
            <div className="flex justify-center gap-4">
              {/* Cancel just closes modal */}
              <button
                onClick={() => setShowOffer(false)}
                className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Get Started → navigate to booking page */}
              <button
  onClick={() => {
    setShowOffer(false);
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLScGdw6BLu7UjD0V0O_K1DHlWjdW1zxPr11HBdemvLQg1biZ8g/viewform?usp=header"; 
  }}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
>
  Get Started
</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 🌍 Existing Home Page */}
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <motion.div
            className="bg-black bg-opacity-50 p-10 rounded-xl text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Seamless Interstate Travel Bookings
            </h1>
            <p className="mb-6 text-lg">
              Connect with verified drivers. Book rides with ease. Travel safely
              across Nigeria.
            </p>
            <div className="space-x-4">
              <Link
                to="/booking"
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

        {/* About Us, How It Works, Footer remain unchanged */}
      </div>
    </>
  );
};

export default Home;
