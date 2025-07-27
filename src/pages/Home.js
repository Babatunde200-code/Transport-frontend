import React from 'react';
import Navbar from '../components/Navbar';
import { FaMapMarkedAlt, FaPlaneDeparture, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <section className="text-center py-16 bg-white shadow-md">
          <h1 className="text-4xl font-bold text-blue-700">Welcome to ASAP Travels</h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Connecting you with safe, affordable, and fast interstate travel services. 
            Book, ride, and review — all in one place.
          </p>
          <img
            src="https://images.unsplash.com/photo-1576773813919-2b07f67df3b0?auto=format&fit=crop&w=1600&q=80"
            alt="Travel"
            className="mx-auto mt-8 w-full max-w-3xl rounded-xl shadow"
          />
        </section>

        {/* About Us */}
        <section className="py-16 px-6 md:px-20 bg-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1600&q=80"
              alt="About"
              className="w-full md:w-1/2 rounded-xl shadow"
            />
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">About Us</h2>
              <p className="text-gray-700">
                ASAP Travels is a modern travel-sharing platform built for seamless, safe and efficient interstate trips.
                We connect passengers with drivers already on the move, enabling cost-effective and sustainable travel.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <FaPlaneDeparture className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable Rides</h3>
              <p className="text-gray-700">We only list verified and active travel plans for trusted connections.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <FaMapMarkedAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Your Route</h3>
              <p className="text-gray-700">Monitor and manage your bookings with a clear travel itinerary.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <FaPhoneAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-700">Our team is available around the clock to support your journey.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 md:px-20 bg-blue-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Have questions or need help? Reach out to us via email or call, and we’ll get back to you.
            </p>
            <p className="text-gray-600">📧 support@asaptravels.com</p>
            <p className="text-gray-600">📞 +234 800 000 0000</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
