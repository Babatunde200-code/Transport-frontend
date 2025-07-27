// HomePage.js
import React from 'react';
import bus1 from '../assets/images/bus1.jpg'; // one of the Lagos bus images
import bus2 from '../assets/images/bus2.jpg';

const HomePage = () => (
  <>
    <Navbar />
    <header className="hero relative h-screen bg-gradient-to-br from-blue-50 to-white">
      <img src={bus1} alt="Bus travel Lagos" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="relative z-10 text-center text-white pt-40">
        <h1 className="text-5xl font-bold drop-shadow-lg">ASAP Travels</h1>
        <p className="mt-4 text-xl drop-shadow-md">Connecting travelers across cities with reliable and affordable rides.</p>
      </div>
    </header>
    {/* About Us / Contact Sections */}
    <section className="py-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-blue-700">About Us</h2>
        <p>ASAP Travels is a platform bridging drivers and passengers across Nigerian states with user‑friendly booking and trusted service.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={bus2} alt="Bus terminal scene" className="rounded-lg shadow-md object-cover"/>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p>We aim to provide safe, timely, and cost‑effective inter‑state travel solutions using local transport networks and innovative booking tools.</p>
          </div>
        </div>
      </div>
    </section>
    <footer className="py-6 bg-blue-100 text-center">
      <h3 className="font-semibold text-lg">Contact Us</h3>
      <p>Email: support@asaptravels.com | Phone: +234 800 123 4567</p>
    </footer>
  </>
);

export default HomePage;
