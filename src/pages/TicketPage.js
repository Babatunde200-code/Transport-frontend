import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TicketPage() {
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookingId = location.state?.bookingId;
  const API_BASE = "https://transport-2-0imo.onrender.com/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE}/bookings/${bookingId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Error loading booking:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const downloadTicket = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Travel Ticket", 80, 20);

    doc.autoTable({
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Booking ID", booking.id],
        ["Name", booking.user?.full_name || "Passenger"],
        ["From", booking.ride?.origin],
        ["To", booking.ride?.destination],
        ["Seat Number", booking.seat_number || "Assigned"],
        ["Pickup Point", booking.pickup_location || "—"],
        ["Amount Paid", `₦${booking.total_price}`],
        ["Status", booking.status],
        ["Company Email", "support@asaptravels.ng"],
        ["Website", "https://www.asaptravels.ng"],
      ],
    });

    doc.save(`ASAP_Travel_Ticket_${booking.id}.pdf`);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading ticket...</p>;

  if (!booking)
    return <p className="text-center mt-10 text-red-600">No booking found</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Travel Ticket Confirmation
        </h2>

        <div className="space-y-4 text-gray-700 text-lg">
          <p><strong>Route:</strong> {booking.ride?.origin} → {booking.ride?.destination}</p>
          <p><strong>Departure:</strong> {new Date(booking.ride?.departure_time).toLocaleString()}</p>
          <p><strong>Seat Number:</strong> {booking.seat_number || "To be assigned"}</p>
          <p><strong>Pickup Location:</strong> {booking.pickup_location || "—"}</p>
          <p><strong>Price:</strong> ₦{booking.total_price}</p>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Company:</strong> ASAP Travels</p>
          <p><strong>Website:</strong> <a href="https://www.asaptravels.ng" className="text-blue-600">asaptravels.ng</a></p>
          <p><strong>Email:</strong> support@asaptravels.ng</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={downloadTicket}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md"
          >
            Download Ticket (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
