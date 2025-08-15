import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/my-bookings/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setBookings(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleCancel = (id) => {
    axios.delete(`/api/cancel-booking/${id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      alert("Booking cancelled & seat restored ✅");
      setBookings(bookings.filter(b => b.id !== id));
    })
    .catch(err => alert("Cancel failed ❌"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      {bookings.length === 0 ? <p>No bookings yet.</p> : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="border rounded-xl p-4 shadow">
              <p>{b.travel_plan.from_location} ➝ {b.travel_plan.to_location}</p>
              <p>Seats Booked: {b.seats_booked}</p>
              <button 
                onClick={() => handleCancel(b.id)} 
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg"
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
