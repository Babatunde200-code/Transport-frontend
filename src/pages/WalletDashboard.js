import React, { useState } from "react";

export default function WalletDashboard() {
  const [autoSave, setAutoSave] = useState(false);

  const transactions = [
    { id: 1, type: "Deposit", amount: "+₦5,000", date: "Aug 10, 2025" },
    { id: 2, type: "Ride Payment", amount: "-₦1,200", date: "Aug 9, 2025" },
    { id: 3, type: "Deposit", amount: "+₦2,000", date: "Aug 5, 2025" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Your Wallet</h1>
        <p className="text-gray-600">
          Manage your balance, savings, and payments
        </p>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-medium">Available Balance</h2>
        <p className="text-4xl font-bold mt-2">₦12,800</p>
        <p className="mt-1 text-sm opacity-90">Emergency Fund: ₦3,000</p>
        <button className="mt-4 px-4 py-2 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition">
          Top Up Wallet
        </button>
      </div>

      {/* Auto Save Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Auto-Save from Bank</h3>
          <p className="text-sm text-gray-600">Weekly debit to wallet</p>
        </div>
        <button
          onClick={() => setAutoSave(!autoSave)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            autoSave ? "bg-indigo-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow transform transition ${
              autoSave ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold mb-4 text-gray-900">Transaction History</h3>
        <ul className="divide-y">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between py-2 text-sm text-gray-700"
            >
              <span>{tx.type}</span>
              <span
                className={`${
                  tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {tx.amount}
              </span>
              <span className="text-gray-500">{tx.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
        Pay for Ride with Wallet
      </button>
    </div>
  );
}
