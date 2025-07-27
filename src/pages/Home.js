import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-br from-blue-100 to-blue-200">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Travel Smarter, Book Easier</h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Connecting interstate travelers with reliable ride-sharing. Save time, reduce costs, and ride with trust.
          </p>
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764b4a?auto=format&fit=crop&w=1170&q=80"
            alt="Travel Road"
            className="mt-8 rounded-xl shadow-lg max-w-4xl w-full h-96 object-cover"
          />
        </section>

        {/* About Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">About Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            We are redefining interstate travel with a peer-to-peer ride booking platform. Whether you're traveling or need a package delivered, our solution bridges the gap with verified drivers and seamless coordination.
          </p>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-6 bg-white">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Explore the Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
              alt="Traveler"
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1561037404-61cd46aa6150?auto=format&fit=crop&w=800&q=80"
              alt="Highway"
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80"
              alt="Car Travel"
              className="rounded-lg shadow-md h-64 w-full object-cover"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-blue-50 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">Have questions or want to partner with us? We'd love to hear from you!</p>
          <a
            href="mailto:support@yourcompany.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Email Us
          </a>
        </section>
      </div>
    </>
  );
};

export default Home;
