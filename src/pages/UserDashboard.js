import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaBus,
  FaMoneyBillWave,
  FaHistory,
  FaClock,
  FaBars,
} from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const [dashboardBookings, setDashboardBookings] = useState([]);
  const [dashboardPayments, setDashboardPayments] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  // Protect route
  useEffect(() => {
    if (!token) navigate("/login");
    else fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const authHeader = { Authorization: `Bearer ${token}` };

      // NEW BACKEND ENDPOINTS (correct)
      const bookingsRes = await axios.get(
        "https://transport-2-0imo.onrender.com/api/dashboard/bookings/",
        { headers: authHeader }
      );

      const paymentsRes = await axios.get(
        "https://transport-2-0imo.onrender.com/api/dashboard/payments/",
        { headers: authHeader }
      );

      const pendingRes = await axios.get(
        "https://transport-2-0imo.onrender.com/api/dashboard/payments/pending/",
        { headers: authHeader }
      );

      setDashboardBookings(bookingsRes.data.recent_bookings || []);
      setDashboardPayments(paymentsRes.data.total_payments || 0);
      setPendingPayments(pendingRes.data.pending_payments || 0);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  const totalTrips = dashboardBookings.length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-[#1f2a40] text-white w-full md:w-64 flex-shrink-0 ${
          menuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <img
            src="/profile.png"
            alt="user"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p className="font-semibold text-lg">User</p>
            <p className="text-green-400 text-sm">● Online</p>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          <DashboardLink to="/dashboard" label="Dashboard" />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 rounded text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Top Nav */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
            User Dashboard
          </h1>

          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
          <DashboardCard
            icon={<FaBus className="text-yellow-500 text-4xl" />}
            label="Total Trips"
            value={totalTrips}
          />
          <DashboardCard
            icon={<FaMoneyBillWave className="text-green-500 text-4xl" />}
            label="Total Payments"
            value={`₦${dashboardPayments}`}
          />
          <DashboardCard
            icon={<FaClock className="text-blue-500 text-4xl" />}
            label="Pending Payments"
            value={pendingPayments}
          />
          <DashboardCard
            icon={<FaHistory className="text-red-500 text-4xl" />}
            label="Travel History"
            value={`${totalTrips} Records`}
          />
        </div>

        {/* Book Ride */}
        <button
          onClick={() => navigate("/booking")}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg w-fit mx-auto block"
        >
          Book a Ride
        </button>

        {/* Navigation Dropdown */}
        <div className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-3">Quick Navigation</h2>

          <select
            className="w-full md:w-1/2 p-3 rounded-lg shadow border"
            onChange={(e) => navigate(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="/travel-history">Travel History</option>
            <option value="/payment-history">Payment History</option>
            <option value="/pending-payments">Pending Payments</option>
            <option value="/bookings">All Bookings</option>
          </select>
        </div>

        {/* Recent Bookings Table */}
        <div className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Bookings</h2>

          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            {dashboardBookings.length > 0 ? (
              <table className="w-full min-w-[550px]">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Route</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboardBookings.map((b, i) => (
                    <BookingRow
                      key={i}
                      route={`${b.origin} → ${b.destination}`}
                      date={b.date}
                      amount={`₦${b.amount}`}
                      status={b.payment_status}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No booking records yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---- Components ---- */

function DashboardLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block py-3 px-3 hover:bg-[#24304f] rounded transition"
    >
      {label}
    </Link>
  );
}

function DashboardCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center text-center">
      {icon}
      <p className="mt-2 text-sm md:text-lg font-medium text-gray-600">
        {label}
      </p>
      <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}

function BookingRow({ route, date, amount, status }) {
  const statusColor =
    status?.toLowerCase() === "paid" ? "text-green-600" : "text-red-600";

  return (
    <tr className="border-b">
      <td className="py-3">{route}</td>
      <td>{date}</td>
      <td>{amount}</td>
      <td className={`${statusColor} font-medium`}>{status}</td>
    </tr>
  );
}
