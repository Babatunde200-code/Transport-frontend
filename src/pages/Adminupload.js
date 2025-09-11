// src/pages/AdminUpload.jsx
import React, { useEffect, useState } from "react";
import AdminUploadForm from "../components/AdminUpload"; // ✅ reuse your form
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://transport-2-0imo.onrender.com/api";

const AdminUpload = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch rides after upload or on page load
  const fetchRides = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access");
      const res = await axios.get(`${API_BASE}/travel-plans/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRides(res.data);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Admin: Upload Ride
      </h1>

      {/* Upload form */}
      <div className="max-w-lg mx-auto mb-10">
        <AdminUploadForm onUploaded={fetchRides} />
      </div>

      {/* List of uploaded rides */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Uploaded Rides</h2>
        {loading ? (
          <p>Loading rides...</p>
        ) : rides.length === 0 ? (
          <p>No rides uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="p-4 border rounded-lg shadow bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {ride.from_location} → {ride.to_location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Seats: {ride.available_seats} | Price: ₦{ride.price || "N/A"}
                  </p>
                  {ride.departure_time && (
                    <p className="text-xs text-gray-500">
                      Departure: {new Date(ride.departure_time).toLocaleString()}
                    </p>
                  )}
                </div>
                {ride.car_image && (
                  <img
                    src={ride.car_image}
                    alt="car"
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;
