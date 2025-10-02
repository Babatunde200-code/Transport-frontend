import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, MapPin, Search } from "lucide-react";

export default function BookingForm() {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatCounts, setSeatCounts] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const API_BASE = "https://transport-2-0imo.onrender.com/api";
  const navigate = useNavigate();

  const fetchRides = async () => {
    try {
      const res = await axios.get(`${API_BASE}/rides/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRides(res.data);
      setFilteredRides(res.data);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setMessage({ text: "Failed to load rides.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRides(rides);
    } else {
      const query = searchQuery.toLowerCase();
      const results = rides.filter(
        (ride) =>
          ride.origin.toLowerCase().includes(query) ||
          ride.destination.toLowerCase().includes(query)
      );
      setFilteredRides(results);
    }
  }, [searchQuery, rides]);

  const handleSeatChange = (rideId, value) => {
    setSeatCounts((prev) => ({
      ...prev,
      [rideId]: value,
    }));
  };

  const bookRide = async (rideId) => {
    const seatCount = seatCounts[rideId] || 1;
    try {
      const res = await axios.post(
        `${API_BASE}/rides/${rideId}/book/`,
        { seat_count: seatCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: "Booking successful!", type: "success" });
      navigate("/review-booking", { state: { bookingId: res.data._id } });
    } catch (err) {
      if (err.response) {
        setMessage({
          text: err.response.data.error || "Booking failed.",
          type: "error",
        });
      } else {
        setMessage({ text: "Server error, try again.", type: "error" });
      }
    }
  };

  if (loading)
    return <p className="text-center mt-12 text-lg text-gray-600">Loading rides...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-800 drop-shadow-sm">
        🚗 Book Your Ride
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full sm:w-2/3 md:w-1/2">
          <input
            type="text"
            placeholder="🔍 Search by origin or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl pl-12 pr-5 py-4 text-base sm:text-lg focus:ring-2 focus:ring-blue-500 shadow-md"
          />
          <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Messages */}
      {message.text && (
        <div
          className={`mb-8 p-4 rounded-xl text-center text-lg font-semibold shadow-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Rides */}
      {filteredRides.length === 0 ? (
        <p className="text-center text-gray-500 text-xl font-medium">
          ❌ No rides found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRides.map((ride) => (
            <div
              key={ride._id}
              className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform p-8 flex flex-col justify-between"
            >
              <div>
                {/* Route */}
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                    {ride.origin} → {ride.destination}
                  </h3>
                </div>

                {/* Departure */}
                <p className="flex items-center text-gray-700 text-base mb-2">
                  <CalendarDays className="w-5 h-5 text-blue-500 mr-2" />
                  <span>
                    {ride.departure_time
                      ? new Date(ride.departure_time).toLocaleString()
                      : "No time"}
                  </span>
                </p>

                {/* Seats */}
                <p className="flex items-center text-gray-700 text-base mb-2">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  <span>{ride.available_seats} seats left</span>
                </p>

                {/* Price */}
                <p className="text-blue-700 font-extrabold text-2xl mt-4">
                  ₦{ride.price || "0"}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                {ride.available_seats > 0 ? (
                  <>
                    <select
                      value={seatCounts[ride._id] || 1}
                      onChange={(e) =>
                        handleSeatChange(ride._id, Number(e.target.value))
                      }
                      className="border border-gray-300 rounded-xl px-4 py-2 text-base focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from(
                        { length: ride.available_seats },
                        (_, i) => i + 1
                      ).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => bookRide(ride._id)}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-2xl font-bold shadow-md transition"
                    >
                      Book Now
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded-xl cursor-not-allowed font-semibold"
                  >
                    Full
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
