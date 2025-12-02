import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load Tawk.to script correctly
  useEffect(() => {
    var script = document.createElement("script");
    script.src = "https://embed.tawk.to/692010955148001960c52574/1jaik1itg";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-2xl font-bold text-[#3348A2]">ASAP Travels</h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-10 text-[#3348A2] font-medium">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/about" className="hover:text-gray-600">About Us</Link>
            <Link to="/services" className="hover:text-gray-600">Services</Link>
            <Link to="/book" className="hover:text-gray-600">Book Ride</Link>
            <Link to="/contact" className="hover:text-gray-600">Contact Us</Link>
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
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
            <Link to="/" className="block">Home</Link>
            <Link to="/about" className="block">About Us</Link>
            <Link to="/services" className="block">Services</Link>
            <Link to="/book" className="block">Book Ride</Link>
            <Link to="/contact" className="block">Contact Us</Link>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="pt-36 md:pt-40 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 gap-8">
        
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

          <button
            onClick={() => navigate("/login")}
            className="mt-8 px-8 py-3 bg-[#3348A2] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
          >
            Book a Ride
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="/asap.png"
            alt="Interstate Vehicle"
            className="w-full max-w-md rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      {/* TRAVEL PLANS SECTION */}
      <section className="py-20 bg-white text-center">
  <h2 className="text-4xl font-extrabold text-[#3348A2] mb-4">
    Why Nigerians Choose ASAP Travels
  </h2>

  <p className="text-gray-600 max-w-2xl mx-auto mb-14">
    We make interstate travel fast, safe, and stress-free — designed for the 
    modern traveler who values comfort and reliability.
  </p>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
    {[
      {
        icon: "🚍",
        title: "Modern & Comfortable Buses",
        desc: "Enjoy clean, spacious, and well-maintained vehicles for all your trips.",
      },
      {
        icon: "🕒",
        title: "On-Time Departures",
        desc: "We value your time — no unnecessary delays or last-minute surprises.",
      },
      {
        icon: "🛡️",
        title: "Safe & Secure Travel",
        desc: "Professional drivers and insured trips for complete peace of mind.",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition"
      >
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* FEATURES */}
      <section className="py-20 bg-[#f4f6ff] text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#3348A2]">
          Why Travel With Us?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">
          {[
            { title: "Home Pickup", text: "Convenient pickup from your preferred location." },
            { title: "Fast Booking", text: "Quick and seamless booking process." },
            { title: "Comfort Ride", text: "Clean and comfortable vehicles guaranteed." },
            { title: "GPS Tracking", text: "Track your trip in real-time." }
          ].map((feature, i) => (
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
        <p className="text-3xl font-bold my-4">+234 9033692772</p>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} ASAP Travels
        </p>
      </footer>

    </div>
  );
}
