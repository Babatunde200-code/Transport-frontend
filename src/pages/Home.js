import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const isAdmin = localStorage.getItem("is_staff") === "true"; // ✅ check role

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
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
              offering <span className="text-blue-600 font-semibold">100% free travel</span> 
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

            <div className="flex justify-center gap-4">
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
                to="https://docs.google.com/forms/d/e/1FAIpQLScGdw6BLu7UjD0V0O_K1DHlWjdW1zxPr11HBdemvLQg1biZ8g/viewform?usp=header"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>

              {/* ✅ Show Admin Button only for staff */}
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

        {/* About Us */}
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
              <p className="text-lg">
                ASAP Travels is an innovative web-based platform designed to
                streamline interstate travel bookings in Nigeria and other
                developing regions with similar transport challenges...
              </p>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
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
                desc: "Select where you're coming from and going to, and your travel date.",
              },
              {
                icon: (
                  <FaUserFriends className="text-4xl text-blue-600 mb-4 mx-auto" />
                ),
                title: "Find a Driver",
                desc: "See available drivers already heading your way and book instantly.",
              },
              {
                icon: (
                  <FaPlaneDeparture className="text-4xl text-blue-600 mb-4 mx-auto" />
                ),
                title: "Enjoy the Ride",
                desc: "Get notified, stay in touch, and enjoy smooth travel to your destination.",
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

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6 text-center text-sm">
          &copy; {new Date().getFullYear()} ASAP TRAVELS. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
