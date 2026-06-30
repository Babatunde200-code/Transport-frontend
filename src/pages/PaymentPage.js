import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function PaymentPage() {
  const location = useLocation();
  const navigate  = useNavigate();

  const bookingId = location.state?.bookingId;
  const amount    = location.state?.amount;
  const email     = location.state?.email || "tunde200.james@gmail.com";
  const phone     = location.state?.phone || "08127470107";
  const name      = location.state?.name  || "Test User";

  if (!bookingId || !amount) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6">
        <div className="glass-card p-10 max-w-sm w-full text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-white font-semibold mb-2">Invalid Payment Request</p>
          <p className="text-slate-400 text-sm mb-6">No booking information was found.</p>
          <button onClick={() => navigate("/booking")} className="btn-primary w-full py-3">
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  const config = {
    public_key: "FLWPUBK-671ef24d9faacb12a1ed1a0017b42c96-X",
    tx_ref: `TS-${Date.now()}-${bookingId}`,
    amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: { email, phone_number: phone, name },
    customizations: {
      title: "ASAP Travels Payment",
      description: `Payment for booking #${bookingId}`,
      logo: "https://www.asaptravels.ng/logo.png",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now →",
    callback: async (response) => {
      closePaymentModal();
      if (response.status === "successful") {
        await fetch("https://transport-2-0imo.onrender.com/api/verify-payment/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: response.transaction_id,
            booking_id: bookingId,
            amount, email, phone, name,
          }),
        });
        navigate("/ticket", {
          state: { bookingId, amount, transactionId: response.transaction_id },
        });
      } else {
        alert("Payment was not successful. Please try again.");
      }
    },
    onClose: () => {},
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #04071A 0%, #0A0E2A 100%)" }}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-brand-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-cyan-neon/8 blur-[100px] pointer-events-none" />

      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← Back
        </button>

        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-3xl">
              💳
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Complete Payment</h2>
            <p className="text-blue-200 text-sm">Secure payment via Flutterwave</p>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Booking Summary */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-slate-400 text-sm">Booking ID</span>
                <span className="text-white font-mono text-sm font-semibold">#{bookingId}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-slate-400 text-sm">Passenger</span>
                <span className="text-white text-sm font-medium">{name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-slate-400 text-sm">Email</span>
                <span className="text-white text-sm font-medium">{email}</span>
              </div>
            </div>

            {/* Amount */}
            <div
              className="rounded-2xl p-6 text-center mb-8"
              style={{ background: "linear-gradient(135deg, rgba(59,91,219,0.15) 0%, rgba(0,212,255,0.05) 100%)", border: "1px solid rgba(59,91,219,0.2)" }}
            >
              <p className="text-slate-400 text-sm mb-2">Total Amount Due</p>
              <p className="text-4xl font-black gradient-text">
                ₦{Number(amount).toLocaleString()}
              </p>
            </div>

            {/* Flutterwave button */}
            <FlutterWaveButton
              {...fwConfig}
              className="w-full py-4 font-bold text-base text-white rounded-xl transition-all duration-300 hover:shadow-neon hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #3B5BDB 0%, #00D4FF 100%)" }}
            />

            <p className="text-center text-slate-600 text-xs mt-4 flex items-center justify-center gap-1">
              🔒 Secured by Flutterwave · 256-bit SSL encrypted
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
