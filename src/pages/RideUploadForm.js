import React, { useState } from "react";

const RideUploadForm = () => {
  const [ride, setRide] = useState({ 
    from: "", 
    to: "", 
    date: "", 
    price: "", 
    seats: ""  // ✅ new field
  });

  const handleChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("https://your-backend.com/api/rides/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ admin protected
      },
      body: JSON.stringify(ride),
    });

    const data = await res.json();
    alert(data.message || "Ride uploaded!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input 
        name="from" 
        placeholder="From" 
        value={ride.from}
        onChange={handleChange} 
        className="border p-2 w-full"
      />
      <input 
        name="to" 
        placeholder="To" 
        value={ride.to}
        onChange={handleChange} 
        className="border p-2 w-full"
      />
      <input 
        type="date" 
        name="date" 
        value={ride.date}
        onChange={handleChange} 
        className="border p-2 w-full"
      />
      <input 
        type="number" 
        name="price" 
        placeholder="Price" 
        value={ride.price}
        onChange={handleChange} 
        className="border p-2 w-full"
      />
      <input 
        type="number" 
        name="seats"
        placeholder="Available Seats" 
        value={ride.seats}
        onChange={handleChange} 
        className="border p-2 w-full"
      />
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Upload Ride
      </button>
    </form>
  );
};

export default RideUploadForm;
