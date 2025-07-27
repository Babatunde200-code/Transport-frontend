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
            Bridging the gap in interstate travel. Connect with verified drivers and passengers for safe, affordable, and efficient trips across Nigeria.
          </p>
          <img
            src="https://images.unsplash.com/photo-1586864381100-07b958aa266b?auto=format&fit=crop&w=1600&q=80"
            alt="Hero Travel"
            className="mx-auto mt-8 w-full max-w-3xl rounded-xl shadow-lg"
          />
        </section>

        {/* About Us */}
        <section className="py-16 px-6 md:px-20 bg-blue-100">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src="https://images.unsplash.com/photo-1542315192-d6d2a89f86c3?auto=format&fit=crop&w=800&q=80"
              alt="Travelers"
              className="w-full md:w-1/2 rounded-xl shadow"
            />
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">About Us</h2>
              <p className="text-gray-700">
                ASAP Travels is your smart solution for long-distance travel. We connect travelers with available ride plans,
                reducing travel costs and making movement across cities safe and convenient. Built with community, trust, and technology.
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
              <h3 className="text-xl font-semibold mb-2">Seamless Travel</h3>
              <p className="text-gray-700">Book trips with just a few clicks and get connected with verified drivers.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <FaMapMarkedAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Routes</h3>
              <p className="text-gray-700">Choose from routes posted by drivers heading your way. No extra stress.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <FaPhoneAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Help</h3>
              <p className="text-gray-700">We’re always here. Contact our team at any time for support.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 md:px-20 bg-blue-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Got questions or ideas? Reach out to our team and we’ll respond quickly.
            </p>
            <p className="text-gray-600">📧 contact@asaptravels.com</p>
            <p className="text-gray-600">📞 +234 800 000 0000</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
