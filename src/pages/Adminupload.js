// src/pages/AdminUpload.jsx
import React, { useEffect, useState } from "react";
import AdminUploadForm from "../components/AdminUpload"; // ✅ reuse your upload form
import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_URL || "http://transport-2-0imo.onrender.com/api";

const AdminUpload = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRide, setEditingRide] = useState(null); // ✅ track ride being edited
  const token = localStorage.getItem("access");

  const fetchRides = async () => {
    try {
      setLoading(true);
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

  const deleteRide = async (id) => {
    if (!window.confirm("Delete this ride?")) return;
    try {
      await axios.delete(`${API_BASE}/travel-plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRides(rides.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete ride:", err);
    }
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `${API_BASE}/travel-plans/${editingRide._id}`,
        editingRide,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingRide(null);
      fetchRides();
    } catch (err) {
      console.error("Failed to update ride:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Admin Dashboard
      </h1>

      {/* Upload form */}
      <div className="max-w-lg mx-auto mb-10">
        <AdminUploadForm onUploaded={fetchRides} />
      </div>

      {/* Rides list */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Uploaded Rides</h2>
        {loading ? (
          <p>Loading rides...</p>
        ) : rides.length === 0 ? (
          <p>No rides uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="p-4 border rounded-lg shadow bg-white"
              >
                {editingRide && editingRide._id === ride._id ? (
                  // ✅ Edit form
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingRide.from_location}
                      onChange={(e) =>
                        setEditingRide({
                          ...editingRide,
                          from_location: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="text"
                      value={editingRide.to_location}
                      onChange={(e) =>
                        setEditingRide({
                          ...editingRide,
                          to_location: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="number"
                      value={editingRide.available_seats}
                      onChange={(e) =>
                        setEditingRide({
                          ...editingRide,
                          available_seats: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      type="datetime-local"
                      value={
                        editingRide.departure_time
                          ? new Date(editingRide.departure_time)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingRide({
                          ...editingRide,
                          departure_time: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRide(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // ✅ Normal view
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {ride.from_location} → {ride.to_location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Seats: {ride.available_seats} | Price: ₦
                        {ride.price || "N/A"}
                      </p>
                      {ride.departure_time && (
                        <p className="text-xs text-gray-500">
                          Departure:{" "}
                          {new Date(ride.departure_time).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditingRide(ride)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRide(ride._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
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
