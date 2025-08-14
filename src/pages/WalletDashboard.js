import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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
      <h1 className="text-2xl font-bold">Your Wallet</h1>
      <p className="text-gray-600">Manage your balance, savings, and payments</p>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold">Available Balance</h2>
          <p className="text-3xl font-bold mt-2">₦12,800</p>
          <p className="mt-1 text-sm">Emergency Fund: ₦3,000</p>
          <Button className="mt-4 bg-white text-indigo-600 hover:bg-gray-100">
            Top Up Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Auto Save Settings */}
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Auto-Save from Bank</h3>
            <p className="text-sm text-gray-600">Weekly debit to wallet</p>
          </div>
          <Switch checked={autoSave} onCheckedChange={setAutoSave} />
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Transaction History</h3>
          <ul className="space-y-3">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>{tx.type}</span>
                <span className={tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {tx.amount}
                </span>
                <span className="text-gray-500">{tx.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
        Pay for Ride with Wallet
      </Button>
    </div>
  );
}
