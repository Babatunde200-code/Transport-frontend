import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, getUserInfo } from '../services/auth'; // Make sure this returns user email
import Navbar from '../components/Navbar';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travel_date: '',
  });
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = getUserInfo(); // Must return at least { email: "..." }

  const fetchBookings = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get('https://transport-2-0imo.onrender.com/api/booking/my-bookings/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const res = await axios.post('https://transport-2-0imo.onrender.com/api/booking/book/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 201 || res.status === 200) {
        setMessage('Booking successful! Confirmation email sent.');
        setFormData({ origin: '', destination: '', travel_date: '' });
        fetchBookings();

        // Navigate to payment page with amount and email
        navigate("/pay", {
          state: {
            amount: 3000, // You can make this dynamic later
            email: user.email
          }
        });
      }
    } catch (error) {
      setMessage('Error creating booking. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-white flex flex-col items-center justify-start px-4 pt-8 pb-20">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Book a Ride</h2>
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

        {bookings.length > 0 && (
          <div className="w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">Your Bookings</h3>
            <ul className="space-y-4">
              {bookings.map((booking, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-800"><strong>From:</strong> {booking.origin}</p>
                  <p className="text-gray-800"><strong>To:</strong> {booking.destination}</p>
                  <p className="text-gray-800"><strong>Date:</strong> {booking.travel_date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingForm;
