import React from 'react';
import Navbar from '../components/Navbar';
import { FaMapMarkedAlt, FaPlaneDeparture, FaUserFriends, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1640522337094-8c71d9c1d6f9?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Seamless Interstate Travel Bookings</h1>
            <p className="mb-6 text-lg">Connect with verified drivers. Book rides with ease. Travel safely across Nigeria.</p>
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Get Started</a>
          </div>
        </section>

        {/* About Us */}
        <section className="py-20 px-6 bg-blue-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <img src="https://unsplash.it/500/350?image=1061" alt="About Us" className="rounded-xl shadow-lg w-full md:w-1/2" />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-700">About Us</h2>
              <p className="text-lg">We are building a community-driven travel platform that enables easy and secure bookings between states. Whether you're heading to Lagos, Abuja, or Port Harcourt, find a driver who's already going there.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-700">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="p-6 rounded-lg shadow-lg bg-blue-100">
              <FaMapMarkedAlt className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Set Your Route</h3>
              <p>Select where you're coming from and going to, and your travel date.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-blue-100">
              <FaUserFriends className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Find a Driver</h3>
              <p>See available drivers already heading your way and book instantly.</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-blue-100">
              <FaPlaneDeparture className="text-4xl text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Enjoy the Ride</h3>
              <p>Get notified, stay in touch, and enjoy smooth travel to your destination.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6 bg-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Verified Drivers</h4>
                <p>All drivers go through verification and review processes for safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Affordable Prices</h4>
                <p>Share the cost of travel and make long-distance trips more affordable.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-700 mb-2">Easy Booking</h4>
                <p>Book in seconds, get email confirmation, and keep track of your rides.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">Contact Us</h2>
          <p className="mb-4 text-lg">Have questions, feedback, or partnership ideas?</p>
          <p className="text-lg text-blue-700 font-semibold">Email: support@transportshare.ng</p>
          <p className="text-lg">Phone: +234 800 000 0000</p>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-6 text-center text-sm">
          &copy; {new Date().getFullYear()} TravelShare. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
