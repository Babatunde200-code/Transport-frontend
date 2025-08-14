import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AvailableRides() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rides from backend API
    const fetchRides = async () => {
      try {
        const response = await fetch("https://transport-2-0imo.onrender.com/api/booking/my-bookings/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`, // JWT token
          },
        });
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides();
  }, []);

  const handleBook = (ride) => {
    // Pass selected ride details to booking page
    navigate("/booking", { state: { ride } });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Available Rides</h1>
      <p className="text-gray-600">Choose your preferred ride and book a seat</p>

      <div className="grid md:grid-cols-2 gap-6">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <Card key={ride.id} className="shadow-lg border">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {ride.origin} → {ride.destination}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {ride.date} | {ride.time}
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {ride.available_seats > 0 ? "Book Seat" : "Sold Out"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No rides available right now.</p>
        )}
      </div>
    </div>
  );
}
