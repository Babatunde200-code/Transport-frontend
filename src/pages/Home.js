import React from "react";

export default function HomePage() {
  return (
    <div className="font-montserrat text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[#3348A2] text-white min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Travel Comfortably & Affordably
            </h1>
            <p className="text-lg mb-6">
              Book trips instantly between cities in Nigeria — fast, safe, and reliable.
            </p>
            <button className="bg-white text-[#3348A2] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
              Book a Trip
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="/car-hero.png"
              alt="Car"
              className="w-full max-w-md drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">Our Travel Plans</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Economy Ride", price: "₦5,150/Seat" },
            { title: "Standard Ride", price: "₦7,500/Seat" },
            { title: "Business Ride", price: "₦12,000/Seat" },
          ].map((plan, i) => (
            <div
              key={i}
              className="border p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <img src="/car-small.png" alt="car" className="mx-auto mb-6 w-24" />
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-[#3348A2] text-2xl font-bold mb-4">{plan.price}</p>
              <button className="bg-[#3348A2] text-white px-5 py-2 rounded-lg hover:bg-[#2d3e82] transition">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#f8f9ff] text-center">
        <h2 className="text-3xl font-bold mb-12">Why Travel With Us?</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {["Home Pickup", "Fast Booking", "Comfort Ride", "GPS Tracking"].map(
            (feature, i) => (
              <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
                <p className="text-lg font-semibold mb-3">{feature}</p>
                <p className="text-sm text-gray-600">
                  Experience a better way to travel with convenience and peace of mind.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3348A2] text-white text-center py-8 mt-10">
        <p className="text-lg font-semibold">We are available 24/7 — Book anytime!</p>
        <p className="text-2xl font-bold my-3">+234 901 234 5678</p>
        <p className="text-sm opacity-75">© {new Date().getFullYear()} ASAP Travels</p>
      </footer>
    </div>
  );
}