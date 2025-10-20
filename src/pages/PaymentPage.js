import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const amount = location.state?.amount;
  const email = location.state?.email || "tunde200.james@gmail.com";
  const phone = location.state?.phone || "08127470107";
  const name = location.state?.name || "Test User";

  // Handle invalid navigation
  if (!bookingId || !amount) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Invalid payment request.
      </p>
    );
  }

  const config = {
    public_key: "FLWPUBK-671ef24d9faacb12a1ed1a0017b42c96-X",
    tx_ref: `TS-${Date.now()}-${bookingId}`,
    amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email,
      phone_number: phone,
      name,
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
    callback: async (response) => {
      console.log("Payment response:", response);
      closePaymentModal();

      if (response.status === "successful") {
        // Notify backend to verify and send Telegram alert
        await fetch("https://your-backend-domain.com/api/verify-payment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: response.transaction_id,
            booking_id: bookingId,
            amount,
            email,
            phone,
            name,
          }),
        });

        navigate("/ticket", {
          state: {
            bookingId,
            amount,
            transactionId: response.transaction_id,
          },
        });
      } else {
        alert("Payment was not successful.");
      }
    },
    onClose: () => {
      console.log("Payment modal closed without completing payment");
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Complete Your Payment
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Booking ID:{" "}
          <span className="font-medium text-gray-900">{bookingId}</span>
        </p>

        <div className="text-center mb-8">
          <p className="text-gray-700 text-lg">
            Amount to Pay:{" "}
            <span className="font-semibold text-green-600">
              ₦{amount.toLocaleString()}
            </span>
          </p>
        </div>

        <FlutterWaveButton
          {...fwConfig}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-medium transition-colors"
        />
      </div>
    </div>
  );
}
