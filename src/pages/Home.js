import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-blue-50 py-20 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to TravelShare</h1>
        <p className="text-lg text-gray-700 mb-6">Helping you book rides across states with ease and trust.</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Get Started
        </Link>
      </section>

      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          TravelShare is a peer-to-peer travel platform connecting drivers and passengers traveling across states in Nigeria.
          Whether you're looking to share a ride or book one, we make inter-state travel safe, reliable, and affordable.
        </p>
      </section>

      <section className="py-16 px-6 bg-blue-100 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-8">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { title: 'Sign Up', desc: 'Create your free account to get started.' },
            { title: 'Book a Ride', desc: 'Browse available rides and book in one click.' },
            { title: 'Travel Safely', desc: 'Connect, ride, and reach your destination safely.' },
          ].map((step, i) => (
            <div key={i} className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-600">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">Have questions? We’re here to help!</p>
        <p className="text-blue-700 font-medium">Email: support@travelshare.ng</p>
        <p className="text-blue-700 font-medium">Phone: +234-800-TRAVEL-SHARE</p>
      </section>

      <footer className="bg-blue-700 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} TravelShare. All rights reserved.
      </footer>
    </>
  );
};

export default Home;
