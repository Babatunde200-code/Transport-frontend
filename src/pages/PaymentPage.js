import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const PaymentPage = () => {
  const config = {
    public_key: "FLWPUBK_TEST-2577c5ca58d448731dbf083c8e5e4cdd-X",
    tx_ref: Date.now(),
    amount: 1000,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: "tunde200.james@gmail.com",
      phonenumber: "08127470107",
      name: "James Tunde",
    },
    customizations: {
      title: "ASAP Travels",
      description: "Payment for bus booking",
      logo: "https://yourdomain.com/logo.png", // Optional: Your company logo URL
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // Close modal programmatically
      alert("Payment successful!");
      // Optional: call your backend to verify payment
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-md p-6 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Make Payment</h2>
        <FlutterWaveButton {...fwConfig} />
      </div>
    </div>
  );
};

export default PaymentPage;
