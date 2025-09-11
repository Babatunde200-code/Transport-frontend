import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  // ✅ Fetch rides on load
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/travel-plans/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRides(data);
      } catch (err) {
        console.error("Error fetching rides:", err);
      }
    };
    fetchRides();
  }, [token]);

  // ✅ Handle booking
  const handleBooking = async () => {
    if (!selectedRide || !selectedSeat) return alert("Pick a ride & seat!");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/book-ride/${selectedRide._id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ seat_number: selectedSeat }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("✅ Booking successful!");
        navigate("/my-bookings");
      } else {
        alert(data.error || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Rides</h2>

      {/* ✅ List of rides */}
      <ul className="space-y-4">
        {rides.map((ride) => (
          <li
            key={ride._id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedRide?._id === ride._id ? "bg-blue-100" : ""
            }`}
            onClick={() => {
              setSelectedRide(ride);
              setSelectedSeat(null); // reset seat
            }}
          >
            {ride.from_location} → {ride.to_location} on{" "}
            {new Date(ride.date).toLocaleDateString()} — ₦{ride.price}  
            ({ride.available_seats} seats left)
          </li>
        ))}
      </ul>

      {/* ✅ Seat selection */}
      {selectedRide && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Select a seat for {selectedRide.from_location} →{" "}
            {selectedRide.to_location}
          </h3>
          <div className="grid grid-cols-4 gap-3 max-w-xs">
            {Array.from({ length: selectedRide.seats }, (_, i) => i + 1).map(
              (seat) => {
                const isBooked = selectedRide.booked_seats?.includes(seat);
                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => setSelectedSeat(seat)}
                    className={`p-3 rounded-lg border ${
                      isBooked
                        ? "bg-gray-300 cursor-not-allowed"
                        : selectedSeat === seat
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-blue-100"
                    }`}
                  >
                    Seat {seat}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* ✅ Confirm booking */}
      {selectedSeat && (
        <button
          onClick={handleBooking}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Confirm Booking (Seat {selectedSeat})
        </button>
      )}
    </div>
  );
};

export default BookingForm;
