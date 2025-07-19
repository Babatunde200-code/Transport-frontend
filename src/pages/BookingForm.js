import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../services/auth';
import Navbar from '../components/Navbar'; // ✅ import the navbar

const BookingForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travel_date: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://transport-2-0imo.onrender.com', formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
        }
      });
      setMessage('Booking successful! Confirmation email sent.');
      setFormData({ origin: '', destination: '', travel_date: '' });
    } catch (error) {
      setMessage('Error creating booking. Please try again.');
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ added here */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4">
        <div className="p-8 bg-white shadow-2xl rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Book a Ride</h2>
          {message && <p className="mb-2 text-green-600 text-center">{message}</p>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="origin"
              placeholder="Origin"
              value={formData.origin}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="date"
              name="travel_date"
              value={formData.travel_date}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
