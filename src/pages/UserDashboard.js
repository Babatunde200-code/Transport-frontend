import React from "react";
import { Link } from "react-router-dom";
import { FaBus, FaMoneyBillWave, FaHistory, FaClock, FaUser } from "react-icons/fa";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ====================== SIDEBAR ====================== */}
      <aside className="w-72 bg-[#1f2a40] text-white flex flex-col">
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

        <nav className="mt-6 flex-1 px-4">
          <Link className="block py-3 px-3 hover:bg-[#24304f] rounded" to="/dashboard">
            Dashboard
          </Link>
          <Link className="block py-3 px-3 hover:bg-[#24304f] rounded" to="/travel-history">
            Travel History
          </Link>
          <Link className="block py-3 px-3 hover:bg-[#24304f] rounded" to="/payment-history">
            Payment History
          </Link>
          <Link className="block py-3 px-3 hover:bg-[#24304f] rounded" to="/pending-payments">
            Pending Payments
          </Link>
          <Link className="block py-3 px-3 hover:bg-[#24304f] rounded" to="/bookings">
            All Bookings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 bg-red-500 rounded text-sm font-semibold">
            Logout
          </button>
        </div>
      </aside>

      {/* ====================== MAIN DASHBOARD ====================== */}
      <main className="flex-1">

        {/* TOP NAV */}
        <header className="w-full bg-white shadow px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

          <Link
            to="/book"
            className="bg-[#3348A2] text-white px-5 py-2 rounded-lg shadow hover:bg-blue-900 transition"
          >
            Book a Ride
          </Link>
        </header>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
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

        {/* Tables Section */}
        <div className="p-8">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>

          <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Route</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Ife → Ibadan</td>
                  <td>12 Jan 2025</td>
                  <td>₦5,150</td>
                  <td className="text-green-600 font-medium">Paid</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Ibadan → Lagos</td>
                  <td>05 Jan 2025</td>
                  <td>₦10,100</td>
                  <td className="text-red-600 font-medium">Pending</td>
                </tr>

                <tr>
                  <td className="py-3">Ife → Akure</td>
                  <td>28 Dec 2024</td>
                  <td>₦7,000</td>
                  <td className="text-green-600 font-medium">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

function DashboardCard({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
      {icon}
      <p className="mt-3 text-lg font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}
