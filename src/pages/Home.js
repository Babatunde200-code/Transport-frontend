import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to TravelShare</h1>
            <p className="text-lg text-gray-700 mb-6">
              Book or share inter-state rides across Nigeria easily and safely.
            </p>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
          <img
             src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
             alt="Traveling"
             className="w-full max-h-80 object-cover rounded-xl shadow-lg"
/>

          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">About Us</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <p className="text-gray-600 text-lg">
            TravelShare is a peer-to-peer transport platform that connects travelers with drivers heading to the same
            destination. Our mission is to make inter-state travel more affordable, accessible, and reliable for
            everyone in Nigeria.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
            alt="About TravelShare"
            className="w-full rounded-lg shadow-md"
/>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-blue-100 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-8">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            {
              title: '1. Sign Up',
              desc: 'Create your free account to access our travel network.',
              img: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
            },
            {
              title: '2. Book a Ride',
              desc: 'Browse available trips and book a ride that suits your route.',
              img: 'https://cdn-icons-png.flaticon.com/512/274/274855.png',
            },
            {
              title: '3. Travel Safely',
              desc: 'Meet your driver and enjoy a safe, smooth journey.',
              img: 'https://cdn-icons-png.flaticon.com/512/1804/1804539.png',
            },
          ].map((step, i) => (
            <div key={i} className="bg-white shadow-md p-6 rounded-xl">
              <img src={step.img} alt={step.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-600">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-10">Why Choose TravelShare?</h2>
        <div className="grid gap-6 md:grid-cols-4 max-w-6xl mx-auto">
          {[
            {
              icon: 'https://cdn-icons-png.flaticon.com/512/709/709790.png',
              title: 'Verified Drivers',
              text: 'All drivers are vetted for a secure experience.',
            },
            {
              icon: 'https://cdn-icons-png.flaticon.com/512/3030/3030993.png',
              title: 'Affordable',
              text: 'Split costs with fellow travelers.',
            },
            {
              icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079029.png',
              title: 'Simple Booking',
              text: 'Book a ride in a few easy steps.',
            },
            {
              icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
              title: '24/7 Support',
              text: 'We’re always here to help you.',
            },
          ].map((f, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-6">
              <img src={f.icon} alt={f.title} className="w-14 h-14 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-600">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 px-6 bg-blue-100 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">Have questions or need help? Reach out!</p>
        <p className="text-blue-700 font-medium">Email: support@travelshare.ng</p>
        <p className="text-blue-700 font-medium">Phone: +234-800-TRAVEL-SHARE</p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} TravelShare. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
        </div>
      </footer>
    </>
  );
};

export default Home;
