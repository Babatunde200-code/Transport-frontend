import React from "react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative w-full bg-[#3348A2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Text */}
          <div className="animate-fadeIn">
            <h1 class="text-4xl font-bold text-[#0077FF]">Travel Smarter Across Cities</h1>
            <p class="text-lg text-[#111111]">Affordable Interstate Rides, Anytime.<br/>Connecting Travelers, Making Trips Easier.</p>
            <p className="mt-2 text-white/80 md:text-lg">
              Connecting Travelers, Making Trips Easier.
            </p>

            <a href="#plans">
              <button className="mt-8 px-8 py-3 bg-white text-[#3348A2] font-semibold rounded-lg shadow-lg hover:shadow-xl transition">
                Book a Ride
              </button>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative animate-fadeIn">
            <div className="absolute inset-0 blur-2xl opacity-30 rounded-[28px] bg-white"></div>
            <img
              src="/park2.jpg"
              alt="Travel Ride"
              className="relative w-full h-[450px] md:h-[520px] object-cover rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            />
          </div>

        </div>
      </section>


      {/* TRAVEL PLANS SECTION */}
      <section id="plans" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2] animate-fadeIn">Our Travel Plans</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 animate-fadeIn">
          {[{ title: "Economy Ride", price: "₦5,150 / Seat" }, { title: "Standard Ride", price: "₦7,500 / Seat" }, { title: "Business Ride", price: "₦12,000 / Seat" }].map((plan, i) => (
            <div key={i} className="border p-8 rounded-xl shadow hover:shadow-xl transition bg-white">
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


      {/* FEATURES */}
      <section className="py-20 bg-[#f4f6ff] text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2] animate-fadeIn">Why Travel With Us?</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6 animate-fadeIn">
          {[{ title: "Home Pickup", text: "Convenient pickup from your preferred location." }, { title: "Fast Booking", text: "Quick and seamless booking process." }, { title: "Comfort Ride", text: "Clean and comfortable vehicles guaranteed." }, { title: "GPS Tracking", text: "Track your trip in real-time." }].map((feature, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
              <p className="text-lg font-semibold mb-3">{feature.title}</p>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-[#3348A2] text-white text-center py-10">
        <p className="text-lg font-semibold">We are available 24/7 — Book anytime!</p>
        <p className="text-3xl font-bold my-4">+234 901 234 5678</p>
        <p className="text-sm opacity-75">© {new Date().getFullYear()} ASAP Travels</p>
      </footer>

    </div>
  );
}
