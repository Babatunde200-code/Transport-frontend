import React, { useState } from "react";
import API from "../api";

export default function UploadRide() {
  const [ride, setRide] = useState({
    origin: "",
    destination: "",
    departure_time: "",
    price: "",
    available_seats: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // ✅ Ensure departure_time is in full ISO format
      const rideData = {
        ...ride,
        departure_time: new Date(ride.departure_time).toISOString(),
        available_seats: Number(ride.available_seats),
        price: Number(ride.price),
      };

      await API.post("/api/admin/rides/", rideData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Ride created successfully!");
      setRide({
        origin: "",
        destination: "",
        departure_time: "",
        price: "",
        available_seats: "",
      });
    } catch (err) {
      console.error("Ride creation failed:", err.response?.data || err);
      alert(
        `❌ Failed to create ride: ${
          err.response?.data?.error || "Something went wrong"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Upload Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="From (Origin)"
          value={ride.origin}
          onChange={(e) => setRide({ ...ride, origin: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          placeholder="To (Destination)"
          value={ride.destination}
          onChange={(e) => setRide({ ...ride, destination: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={ride.departure_time}
          onChange={(e) =>
            setRide({ ...ride, departure_time: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={ride.price}
          onChange={(e) => setRide({ ...ride, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={ride.available_seats}
          onChange={(e) =>
            setRide({ ...ride, available_seats: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Ride"}
        </button>
      </form>
    </div>
  );
}
