import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
  FaBus,
  FaMoneyBillWave,
  FaHistory,
  FaClock,
  FaBars,
} from "react-icons/fa";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* ================= SIDEBAR (Responsive) ================= */}
      <aside
        className={`bg-[#1f2a40] text-white w-full md:w-64 flex-shrink-0
        ${menuOpen ? "block" : "hidden md:block"}`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <img
            src="/profile.png"
            alt="user"
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p className="font-semibold text-lg">John Doe</p>
            <p className="text-green-400 text-sm">● Online</p>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          <DashboardLink to="/dashboard" label="Dashboard" />
          <DashboardLink to="/travel-history" label="Travel History" />
          <DashboardLink to="/payment-history" label="Payment History" />
          <DashboardLink to="/pending-payments" label="Pending Payments" />
          <DashboardLink to="/bookings" label="All Bookings" />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 bg-red-500 rounded text-sm font-semibold">
            Logout
          </button>
        </div>
      </aside>

      {/* =============== MAIN CONTENT ================ */}
      <main className="flex-1">

        {/* TOP NAV */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
            User Dashboard
          </h1>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>

          <button
        onClick={() => navigate("/booking")}
        className="fixed bottom-4 right-4 bg-blue-600 text-white py-3 px-5 rounded-full shadow-lg md:static w-full"
      >
        Book a Ride
      </button>
        </header>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8">
          <DashboardCard
            icon={<FaBus className="text-yellow-500 text-4xl" />}
            label="Total Trips"
            value="24"
          />

          <DashboardCard
            icon={<FaMoneyBillWave className="text-green-500 text-4xl" />}
            label="Total Payments"
            value="₦152,000"
          />

          <DashboardCard
            icon={<FaClock className="text-blue-500 text-4xl" />}
            label="Pending Payments"
            value="3"
          />

          <DashboardCard
            icon={<FaHistory className="text-red-500 text-4xl" />}
            label="Travel History"
            value="24 Records"
          />
        </div>

        {/* TABLE */}
        <div className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Recent Bookings</h2>

          <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
            <table className="w-full min-w-[550px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Route</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                <BookingRow route="Ife → Ibadan" date="12 Jan 2025" amount="₦5,150" status="Paid" />
                <BookingRow route="Ibadan → Lagos" date="05 Jan 2025" amount="₦10,100" status="Pending" />
                <BookingRow route="Ife → Akure" date="28 Dec 2024" amount="₦7,000" status="Paid" />
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

/* COMPONENTS */
function DashboardLink({ to, label }) {
  return (
    <Link
      className="block py-3 px-3 hover:bg-[#24304f] rounded transition"
      to={to}
    >
      {label}
    </Link>
  );
}

function DashboardCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center text-center">
      {icon}
      <p className="mt-2 text-sm md:text-lg font-medium text-gray-600">{label}</p>
      <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function BookingRow({ route, date, amount, status }) {
  const statusColor = status === "Paid" ? "text-green-600" : "text-red-600";

  return (
    <tr className="border-b">
      <td className="py-3">{route}</td>
      <td>{date}</td>
      <td>{amount}</td>
      <td className={`${statusColor} font-medium`}>{status}</td>
    </tr>
  );
}
