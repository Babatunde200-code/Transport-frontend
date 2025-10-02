import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TripsList({ token }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await axios.get("/api/rides/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, [token]);

  if (loading) return <p>Loading trips...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
      {trips.length === 0 ? (
        <p>No rides available.</p>
      ) : (
        <div className="grid gap-4">
          {trips.map((trip) => (
            <div key={trip._id} className="p-4 border rounded-lg shadow">
              <p className="font-semibold">
                {trip.origin} → {trip.destination}
              </p>
              <p className="text-gray-600">
                Departure: {new Date(trip.departure_time).toLocaleString()}
              </p>
              <p className="text-gray-600">
                Seats left: {trip.available_seats}
              </p>

              {trip.available_seats > 0 ? (
                <a
                  href={`/book/${trip._id}`}
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Book Now
                </a>
              ) : (
                <button
                  disabled
                  className="mt-2 inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  Full
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
