// src/components/AdminUpload.js
import React, { useState } from "react";
import axios from "axios";

export default function AdminUpload({ onUploaded }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [availableSeats, setAvailableSeats] = useState(1);
  const [departureTime, setDepartureTime] = useState(""); // optional ISO string or local datetime-local
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Please login as admin to upload.");
      return;
    }

    if (!fromLocation || !toLocation || !imageFile) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("from_location", fromLocation);
    formData.append("to_location", toLocation);
    formData.append("available_seats", availableSeats);
    if (departureTime) formData.append("departure_time", departureTime);
    formData.append("car_image", imageFile); // ensure backend expects `car_image` field

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/travel-plans/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type; axios will set the correct multipart boundary
        },
      });
      alert("✅ Trip uploaded.");
      // optional callback so parent can refresh list
      if (typeof onUploaded === "function") onUploaded();
      // reset
      setFromLocation("");
      setToLocation("");
      setAvailableSeats(1);
      setDepartureTime("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired — please login again.");
        localStorage.removeItem("access");
        window.location.href = "/login";
        return;
      }
      console.error(err);
      const message = err.response?.data || "Upload failed, check console.";
      alert(JSON.stringify(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Upload Trip (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">From</label>
          <input value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. Lagos" />
        </div>
        <div>
          <label className="block text-sm">To</label>
          <input value={toLocation} onChange={(e) => setToLocation(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. Ibadan" />
        </div>
        <div>
          <label className="block text-sm">Available Seats</label>
          <input type="number" value={availableSeats} min={1} onChange={(e) => setAvailableSeats(e.target.value)} className="w-32 px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Departure (optional)</label>
          <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Car Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && <img src={previewUrl} alt="preview" className="w-full h-40 object-cover mt-2 rounded" />}
        </div>
        <div>
          <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-green-600 text-white w-full">
            {loading ? "Uploading..." : "Upload Trip"}
          </button>
        </div>
      </form>
    </div>
  );
}
