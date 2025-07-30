import React, { useEffect } from "react";

const PaymentPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const makePayment = () => {
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-2577c5ca58d448731dbf083c8e5e4cdd-X", // Replace with your public key
      tx_ref: Date.now().toString(),
      amount: 3000,
      currency: "NGN",
      payment_options: "card,ussd",
      customer: {
        email: "user@example.com",
        name: "John Doe",
      },
      callback: function (response) {
        console.log("Payment callback:", response);
        alert("Payment successful!");
      },
      onclose: function () {
        console.log("Payment modal closed");
      },
      customizations: {
        title: "TravelShare",
        description: "Payment for ride booking",
        logo: "https://yourlogo.png",
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-md p-6 rounded-md text-center">
        <h2 className="text-xl font-semibold mb-4">Make Payment</h2>
        <button
          onClick={makePayment}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
