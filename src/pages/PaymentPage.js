import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const amount = location.state?.amount;

  if (!bookingId || !amount) {
    return <p className="text-center mt-10 text-red-600">Invalid payment request</p>;
  }

  const config = {
    public_key: "FLWPUBK-671ef24d9faacb12a1ed1a0017b42c96-X",
    tx_ref: Date.now(),
    amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: location.state?.email || "tunde200.james@gmail.com",  // ✅ Add a valid email
      phone_number: location.state?.phone || "08127470107",   // optional but good to include
      name: location.state?.name || "Test User",               // optional
    },
    customizations: {
      title: "Ride Booking Payment",
      description: `Payment for booking #${bookingId}`,
      logo: "https://your-logo-url.com/logo.png",
    },
  };
  
  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response) => {
      console.log("Payment response:", response);
      closePaymentModal();
      navigate("/"); // ✅ redirect after payment
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold mb-6 text-center">Complete Your Payment</h2>
        <FlutterWaveButton {...fwConfig} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium" />
      </div>
    </div>
  );
}
