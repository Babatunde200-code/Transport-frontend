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
        {/* 🌍 Hero Section */}
        <section
          className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          {/* 🚐 Launch Offer Modal */}
          {showOffer && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-lg p-8 text-center max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700">
                  🚐 ASAP Travels – Special Launch Offer 🚐
                </h2>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  We’re excited to announce that{" "}
                  <strong>ASAP Travels</strong> is offering{" "}
                  <span className="text-blue-600 font-semibold">
                    50% off travel fares
                  </span>{" "}
                  for the first set of passengers booking from{" "}
                  <b>Ife to Ibadan</b>! We also accept bookings for{" "}
                  <b>Ibadan to Ife</b>.
                </p>

                <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
                  <li>📌 Limited seats available – first come, first served.</li>
                  <li>📌 Fill out the form below to secure your spot.</li>
                </ul>

                <h3 className="text-sm text-gray-700 font-medium mb-2">
                  <b>N.B:</b> The discount applies only to{" "}
                  <b>Ife ↔ Ibadan</b> routes and runs{" "}
                  <b>every Friday for one month</b>. Other days require full
                  payment.
                </h3>

                <h3 className="text-sm text-gray-700 font-medium mb-6">
                  <b>Note:</b> If you’re bringing heavy luggage, please make
                  arrangements directly with the driver.
                </h3>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowOffer(false)}
                    className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <Link
                    to="https://docs.google.com/forms/d/e/1FAIpQLScGdw6BLu7UjD0V0O_K1DHlWjdW1zxPr11HBdemvLQg1biZ8g/viewform?usp=header"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    onClick={() => setShowOffer(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          {/* 🏠 Hero Content */}
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
              Connect with verified drivers. Book rides easily. Travel safely
              across Nigeria.
            </p>
            <div className="space-x-4">
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLScGdw6BLu7UjD0V0O_K1DHlWjdW1zxPr11HBdemvLQg1biZ8g/viewform?usp=header"
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
              src="https://images.unsplash.com/photo-1606299747068-ea8669f678b8?q=80&w=2833&auto=format&fit=crop"
              alt="About Us"
              className="rounded-xl shadow-lg w-full md:w-1/2"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-700">
                About Us
              </h2>
              <p className="text-lg leading-relaxed">
                <strong>ASAP Travels</strong> is an innovative platform designed
                to simplify interstate travel bookings in Nigeria and other
                regions with similar challenges. Our mission is to make travel
                safer, smarter, and more accessible for everyone.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ⚙️ How It Works */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-700">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <FaMapMarkedAlt className="text-4xl text-blue-600 mb-4 mx-auto" />
                ),
                title: "Set Your Route",
                desc: "Choose your origin, destination, and travel date.",
              },
              {
                icon: (
                  <FaUserFriends className="text-4xl text-blue-600 mb-4 mx-auto" />
                ),
                title: "Find a Driver",
                desc: "View available drivers heading your way and book instantly.",
              },
              {
                icon: (
                  <FaPlaneDeparture className="text-4xl text-blue-600 mb-4 mx-auto" />
                ),
                title: "Enjoy the Ride",
                desc: "Stay updated, stay connected, and travel with ease.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg shadow-lg bg-blue-100"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5 + i * 0.2 }}
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p>{step.desc}</p>
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
