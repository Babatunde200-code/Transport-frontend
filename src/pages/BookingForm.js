import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null);

  // Base API (switch between local + production)
  const API_BASE =
    process.env.REACT_APP_API_URL ||
    "http://127.0.0.1:8000/api/travel"; // remove double `/`

  // ✅ Fetch rides
  useEffect(() => {
    const token = localStorage.getItem("access"); // always use "access"

    if (!token) {
      setError("❌ Please login to see available rides.");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/travel-plans/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRides(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const message =
          err.response?.data?.detail ||
          "⚠️ Failed to load rides. Please try again.";
        setError(message);
        setLoading(false);
      });
  }, [API_BASE]);

  // ✅ Handle booking
  const handleBook = async (rideId) => {
    const token = localStorage.getItem("access"); // consistent key
    if (!token) {
      alert("❌ Please login first!");
      return;
    }

    try {
      setBookingId(rideId);
      await axios.post(
        `${API_BASE}/book-ride/${rideId}/`,
        { seats_booked: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Booking successful!");
      // update seat count locally
      setRides((prev) =>
        prev.map((ride) =>
          ride.id === rideId
            ? { ...ride, available_seats: ride.available_seats - 1 }
            : ride
        )
      );
    } catch (err) {
      const message =
        err.response?.data?.detail || "❌ Booking failed, try again.";
      alert(message);
    } finally {
      setBookingId(null);
    }
  };

  // ✅ UI States
  if (loading) {
    return (
      <div className="p-6">
        <p className="animate-pulse text-gray-600">
          ⏳ Loading available rides...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {rides.length === 0 ? (
        <p className="text-center col-span-2 text-gray-500">
          No rides available at the moment 🚗
        </p>
      ) : (
        rides.map((ride) => (
          <div
            key={ride.id}
            className="border rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={ride.car_image || "https://via.placeholder.com/300"}
              alt="Car"
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            <h2 className="text-lg font-semibold">
              {ride.from_location} ➝ {ride.to_location}
            </h2>
            <p className="text-sm text-gray-600">
              Available Seats: {ride.available_seats}
            </p>
            <button
              onClick={() => handleBook(ride.id)}
              disabled={ride.available_seats <= 0 || bookingId === ride.id}
              className={`mt-2 px-4 py-2 rounded-lg w-full ${
                ride.available_seats > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {bookingId === ride.id
                ? "⏳ Booking..."
                : ride.available_seats > 0
                ? "Book Seat"
                : "Fully Booked"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
