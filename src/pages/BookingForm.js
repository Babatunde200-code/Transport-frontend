import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";



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

  // FIX: Wrap fetchRides in useCallback so it is stable
  const fetchRides = useCallback(async () => {
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
  }, [API_BASE, token]);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);


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
      <div className="bg-gray-50 min-h-screen pb-20">
    
        {/* Top Search Section */}
        <section className="bg-[#3348A2] py-12">
          <div className="max-w-4xl mx-auto text-center text-white px-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find Your Perfect Ride
            </h1>
            <p className="text-white/90 text-lg mb-8">Travel affordably and conveniently across cities.</p>
    
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for city or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full py-4 pl-14 pr-5 text-lg text-[#3348A2] border border-white shadow-lg outline-none"
              />
              <Search className="absolute left-5 top-4 w-6 h-6 text-white opacity-75" />
            </div>
          </div>
        </section>
    
        {/* Ride Cards Section */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
    
          {/* Status Message */}
          {message.text && (
            <div className={`mb-6 p-4 text-center rounded-xl font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {message.text}
            </div>
          )}
    
          {filteredRides.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No rides found. Try another search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredRides.map((ride) => (
                <div key={ride._id} className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition">
                  
                  {/* Card Placeholder Image */}
                  <div className="h-44 bg-gray-200">
                    <img
                      src="/bus1.jpeg"
                      className="w-full h-full object-cover"
                      alt="Ride bus"
                    />
                  </div>
    
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#3348A2]">
                      {ride.origin} → {ride.destination}
                    </h3>
    
                    <p className="text-gray-600 mt-2">
                      Departure:{" "}
                      <span className="font-medium">
                        {ride.departure_time ? new Date(ride.departure_time).toLocaleString() : "Not set"}
                      </span>
                    </p>
    
                    <p className="text-gray-600 mt-1">Seats left: {ride.available_seats}</p>
    
                    <p className="text-2xl font-bold text-[#3348A2] mt-4">₦{ride.price}</p>
    
                    <div className="mt-6 flex justify-between items-center">
                      <select
                        value={seatCounts[ride._id] || 1}
                        onChange={(e) =>
                          handleSeatChange(ride._id, Number(e.target.value))
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2"
                      >
                        {Array.from({ length: ride.available_seats }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
    
                      <button
                        onClick={() => bookRide(ride._id)}
                        className="bg-[#3348A2] hover:bg-[#263a85] text-white px-5 py-2 rounded-lg shadow-md transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
    
        </div>
      </div>
    );
    }    