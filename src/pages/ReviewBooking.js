import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewBookingPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API_BASE = "https://transport-2-0imo.onrender.com/api";

  const bookingId = location.state?.bookingId;

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID found.");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE}/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Loaded booking:", res.data);
        setBooking(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, token]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading booking...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 font-medium">{error}</p>
    );
  }

  if (!booking) {
    return (
      <p className="text-center mt-10 text-gray-500">No booking found.</p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">
          Review Your Booking
        </h2>

        {/* Booking Details */}
        <div className="space-y-5 text-gray-700 text-lg md:text-xl">

          <p>
            <span className="font-semibold">Route:</span>{" "}
            {booking.ride?.origin} → {booking.ride?.destination}
          </p>

          <p>
            <span className="font-semibold">Departure:</span>{" "}
            {booking.ride?.departure_time
              ? new Date(booking.ride.departure_time).toLocaleString()
              : "No time"}
          </p>

          <p>
            <span className="font-semibold">Seat Count:</span>{" "}
            {booking.seat_count}
          </p>

          <p>
            <span className="font-semibold">Total Price:</span>{" "}
            ₦{booking.total_price}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === "paid"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>

        {/* Pay Now */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() =>
              navigate("/payment", {
                state: {
                  bookingId: bookingId,
                  amount: booking.total_price,
                },
              })
            }
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg md:text-xl px-10 py-4 rounded-2xl shadow-md transition-all"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
