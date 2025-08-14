import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AvailableRides() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch(
          "https://transport-2-0imo.onrender.com/api/booking/my-bookings/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`, // JWT
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch rides. Please try again later.");
        }

        const data = await response.json();
        setRides(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleBook = (ride) => {
    navigate("/booking", { state: { ride } });
  };

  // Utility: format date & time nicely
  const formatDateTime = (date, time) => {
    try {
      const formatted = new Date(`${date}T${time}`).toLocaleString("en-NG", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formatted;
    } catch {
      return `${date} | ${time}`;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Available Rides</h1>
      <p className="text-gray-600">Choose your preferred ride and book a seat</p>

      {loading && <p className="text-gray-500">Loading rides...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {!loading && !error && rides.length > 0 ? (
          rides.map((ride) => (
            <Card key={ride.id} className="shadow-md border rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {ride.origin} → {ride.destination}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(ride.date, ride.time)}
                  </span>
                </div>

                <p className="text-gray-700">
                  Available Seats:{" "}
                  <span className="font-semibold">{ride.available_seats}</span>
                </p>
                <p className="text-indigo-600 font-bold">₦{ride.price}</p>

                <Button
                  onClick={() => handleBook(ride)}
                  disabled={ride.available_seats === 0}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  {ride.available_seats > 0 ? "Book Seat" : "Sold Out"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 italic">
              No rides available at the moment. Please check back later.
            </p>
          )
        )}
      </div>
    </div>
  );
}
