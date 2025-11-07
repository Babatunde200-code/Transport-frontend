import React, { useState } from 'react';
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
{/* NAVBAR */}
<header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-2xl font-bold text-[#3348A2]">ASAP Travels</h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-10 text-[#3348A2] font-medium">
            <a href="#" className="hover:text-gray-600">Home</a>
            <a href="#about" className="hover:text-gray-600">About Us</a>
            <a href="#services" className="hover:text-gray-600">Service</a>
            <a href="#book" className="hover:text-gray-600">Book Ride</a>
            <a href="#contact" className="hover:text-gray-600">Contact Us</a>
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="md:hidden text-[#3348A2] text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white px-6 pb-4 space-y-3 text-[#3348A2] font-medium">
            <a href="#" className="block">Home</a>
            <a href="#about" className="block">About Us</a>
            <a href="#services" className="block">Service</a>
            <a href="#book" className="block">Book Ride</a>
            <a href="#contact" className="block">Contact Us</a>
          </div>
        )}
      </header>
      {/* HERO SECTION */}
      <section className="pt-36 md:pt-40 h-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-8">
  {/* LEFT TEXT */}
  <div className="flex-1 text-center md:text-left">
    <h1 className="text-4xl md:text-6xl font-bold text-[#3348A2] leading-tight">
      Travel Smarter Across Cities
    </h1>

    <p className="mt-4 text-lg md:text-2xl text-gray-700 font-light">
      Affordable Interstate Rides, Anytime.
    </p>

    <p className="mt-1 text-gray-600 md:text-lg">
      Connecting Travelers, Making Trips Easier.
    </p>

    <button href = "/login" className="mt-8 px-8 py-3 bg-[#3348A2] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition">
      Book a Ride
    </button>
  </div>

  {/* RIGHT IMAGE */}
  <div className="flex-1 flex justify-center">
    <img
      src="/bus.jpg" // <-- save your uploaded image with this name
      alt="Interstate Vehicle"
      className="w-full max-w-md rounded-2xl object-cover shadow-md"
    />
  </div>
</section>


      {/* TRAVEL PLANS SECTION */}
      <section id="plans" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2] animate-fadeIn">Our Travel Plans</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 animate-fadeIn">
          {[{ title: "Economy Ride", price: "₦5,150 / Seat" }, { title: "Standard Ride", price: "₦7,500 / Seat" }, { title: "Business Ride", price: "₦12,000 / Seat" }].map((plan, i) => (
            <div key={i} className="border p-8 rounded-xl shadow hover:shadow-xl transition bg-white">
              <img src="/bus1.jpeg" alt="car" className="mx-auto mb-6 w-24" />
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
