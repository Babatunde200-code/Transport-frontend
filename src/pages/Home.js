import React from "react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full bg-[#3348A2]">
  <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* Left Text */}
    <div>
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
        Travel Smarter Across Cities
      </h1>

      <p className="mt-4 text-lg md:text-2xl text-white/90 font-light">
        Affordable Interstate Rides, Anytime.
      </p>

      <p className="mt-2 text-white/80 md:text-lg">
        Connecting Travelers, Making Trips Easier.
      </p>

      <button className="mt-8 px-8 py-3 bg-white text-[#3348A2] font-semibold rounded-lg shadow-lg hover:shadow-xl transition">
        Book a Ride
      </button>
    </div>

    {/* Right Image */}
    <div className="w-full h-[420px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
      <img
        src="/park2.jpg" // ✅ Make sure this matches your uploaded filename
        alt="Travel Ride"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</section>

      {/* Tariffs Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2]">Our Travel Plans</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Economy Ride", price: "₦5,150 / Seat" },
            { title: "Standard Ride", price: "₦7,500 / Seat" },
            { title: "Business Ride", price: "₦12,000 / Seat" },
          ].map((plan, i) => (
            <div
              key={i}
              className="border p-8 rounded-xl shadow hover:shadow-xl transition bg-white"
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
      <section className="py-20 bg-[#f4f6ff] text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2]">Why Travel With Us?</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {[
            { title: "Home Pickup", text: "Convenient pickup from your preferred location." },
            { title: "Fast Booking", text: "Quick and seamless booking process." },
            { title: "Comfort Ride", text: "Clean and comfortable vehicles guaranteed." },
            { title: "GPS Tracking", text: "Track your trip in real-time." },
          ].map((feature, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
              <p className="text-lg font-semibold mb-3">{feature.title}</p>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3348A2] text-white text-center py-10">
        <p className="text-lg font-semibold">We are available 24/7 — Book anytime!</p>
        <p className="text-3xl font-bold my-4">+234 901 234 5678</p>
        <p className="text-sm opacity-75">© {new Date().getFullYear()} ASAP Travels</p>
      </footer>
    </div>
  );
}
