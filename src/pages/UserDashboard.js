import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBus, FaMoneyBillWave, FaHistory, FaClock, FaBars, FaSyncAlt } from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [pendingPaymentsList, setPendingPaymentsList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper: safe getters for booking fields (covers several backend shapes)
  const parseBookingItem = (b) => {
    // expected shapes handled:
    // { booking_id, route_from, route_to, date, amount, status, seat_number }
    // { booking_id, ride: { origin, destination, departure_time }, amount/price, status, seat_number }
    // { _id, ride: { origin, destination }, price, status }
    const bookingId = b.booking_id || b._id || b.id || "";
    const origin =
      b.route_from ||
      (b.ride && (b.ride.origin || b.ride.from)) ||
      b.origin ||
      (b.from) ||
      "Unknown";
    const destination =
      b.route_to ||
      (b.ride && (b.ride.destination || b.ride.to)) ||
      b.destination ||
      b.to ||
      "Unknown";
    const date =
      b.date ||
      (b.ride && b.ride.departure_time) ||
      b.created_at ||
      (b.createdAt ? b.createdAt : "");
    const amount = (b.amount ?? b.total_price ?? b.price ?? b.total ?? 0);
    const status = b.status ?? b.payment_status ?? b.paymentStatus ?? "pending";
    const seatNumber = b.seat_number ?? b.seatCount ?? b.seatCount ?? null;

    return { bookingId, origin, destination, date, amount, status, seatNumber };
  };

  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");
    if (!token) {
      setError("Not authenticated. Please login.");
      setLoading(false);
      return;
    }

    try {
      const [bRes, pRes, pendingRes] = await Promise.all([
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/bookings/", { headers: authHeader }),
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/payments/", { headers: authHeader }),
        axios.get("https://transport-2-0imo.onrender.com/api/dashboard/payments/pending/", { headers: authHeader }),
      ]);

      // bookings endpoint might return a list or { recent_bookings: [...] }
      const bookingsData = Array.isArray(bRes.data) ? bRes.data : (bRes.data.recent_bookings || bRes.data || []);
      setBookings(bookingsData);

      const paymentsData = Array.isArray(pRes.data) ? pRes.data : (pRes.data.payments || pRes.data || []);
      setPayments(paymentsData);

      const pendingData = Array.isArray(pendingRes.data) ? pendingRes.data : (pendingRes.data.pending || pendingRes.data || []);
      setPendingPaymentsList(pendingData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.response?.data?.error || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDashboardData]);

  // derive totals
  const totalTrips = bookings.length;
  const totalPaymentsAmount = payments.reduce((sum, p) => {
    const v = Number(p.amount ?? p.total ?? p.price ?? 0);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);
  const totalPendingCount = pendingPaymentsList.length;

  // UI helpers
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#1f2a40] text-white w-full md:w-64 flex-shrink-0 ${menuOpen ? "block" : "hidden md:block"}`}>
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <img src="/profile.png" alt="user" className="w-12 h-12 rounded-full border" />
          <div>
            <p className="font-semibold text-lg">User</p>
            <p className="text-green-400 text-sm">● Online</p>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          <Link to="/dashboard" className="block py-3 px-3 hover:bg-[#24304f] rounded transition">Dashboard</Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full py-2 bg-red-500 rounded text-sm font-semibold">Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700">User Dashboard</h1>

          <div className="flex items-center gap-3">
            <button title="Refresh" onClick={fetchDashboardData} className="p-2 rounded bg-gray-100 hover:bg-gray-200">
              <FaSyncAlt />
            </button>
            <button className="md:hidden text-gray-700 text-2xl" onClick={() => setMenuOpen(v => !v)}>
              <FaBars />
            </button>
          </div>
        </header>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
          <SummaryCard icon={<FaBus className="text-yellow-500 text-4xl" />} label="Total Trips" value={totalTrips} />
          <SummaryCard icon={<FaMoneyBillWave className="text-green-500 text-4xl" />} label="Total Payments" value={`₦${totalPaymentsAmount.toFixed(2)}`} />
          <SummaryCard icon={<FaClock className="text-blue-500 text-4xl" />} label="Pending Payments" value={totalPendingCount} />
          <SummaryCard icon={<FaHistory className="text-red-500 text-4xl" />} label="Travel History" value={`${totalTrips} Records`} />
        </div>

        <div className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Bookings</h2>

          {error && <div className="mb-4 text-red-600">{error}</div>}

          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            {bookings.length === 0 ? (
              <p className="text-center text-gray-600">No booking records yet.</p>
            ) : (
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Route</th>
                    <th>Date</th>
                    <th>Seat</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((raw, idx) => {
                    const b = parseBookingItem(raw);
                    return (
                      <tr key={b.bookingId || idx} className="border-b">
                        <td className="py-3">{b.origin} → {b.destination}</td>
                        <td>{b.date ? new Date(b.date).toLocaleString() : "-"}</td>
                        <td>{b.seatNumber ?? "-"}</td>
                        <td>₦{(Number(b.amount) || 0).toLocaleString()}</td>
                        <td className={`${(b.status || "").toLowerCase() === "paid" ? "text-green-600" : "text-yellow-700"} font-medium`}>{b.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Payments (compact) */}
        <div className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Payments</h2>

          <div className="bg-white rounded-xl shadow p-4">
            {payments.length === 0 ? (
              <p className="text-center text-gray-600">No payments yet.</p>
            ) : (
              <ul className="space-y-3">
                {payments.map((p, i) => (
                  <li key={p.payment_id ?? p._id ?? i} className="flex justify-between items-center border rounded p-3">
                    <div>
                      <p className="font-medium">₦{Number(p.amount ?? p.total ?? p.price ?? 0).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Transaction: {p.transaction_id ?? "-"}</p>
                    </div>
                    <div className="text-sm text-gray-600">{p.status ?? "paid"}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Small subcomponents ---------- */
function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center text-center">
      {icon}
      <p className="mt-2 text-sm md:text-lg font-medium text-gray-600">{label}</p>
      <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}
