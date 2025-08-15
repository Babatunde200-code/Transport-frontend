import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookingForm() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://transport-2-0imo.onrender.com/api/travel-plans/") // backend endpoint
      .then(res => {
        setRides(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load rides");
        setLoading(false);
      });
  }, []);

  const handleBook = (rideId) => {
    axios.post(`/api/book-ride/${rideId}/`, { seats_booked: 1 }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      alert("Booking successful ✅");
      window.location.reload();
    })
    .catch(err => {
      alert("Booking failed ❌");
    });
  };

  if (loading) return <p>Loading rides...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {rides.map((ride) => (
        <div key={ride.id} className="border rounded-2xl shadow p-4">
          <img 
            src={ride.car_image || "https://via.placeholder.com/300"} 
            alt="Car" 
            className="w-full h-40 object-cover rounded-xl mb-2"
          />
          <h2 className="text-lg font-semibold">{ride.from_location} ➝ {ride.to_location}</h2>
          <p className="text-sm">Available Seats: {ride.available_seats}</p>
          <button 
            onClick={() => handleBook(ride.id)} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Book Seat
          </button>
        </div>
      ))}
    </div>
  );
}
