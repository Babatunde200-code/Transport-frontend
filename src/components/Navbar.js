import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../services/auth';

const Navbar = () => {
  const user = getUserInfo();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-navy-900/90 backdrop-blur-xl border-b border-white/5 shadow-glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl brand-gradient-bg flex items-center justify-center text-white font-black text-sm shadow-brand">
            AT
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            <span className="gradient-text">ASAP</span>
            <span className="text-white ml-1">Travels</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link text-sm font-medium">Home</Link>
          <Link to="/booking" className="nav-link text-sm font-medium">Book Ride</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link text-sm font-medium">Dashboard</Link>
              <Link to="/profile" className="nav-link text-sm font-medium">Profile</Link>
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link text-sm font-medium">Login</Link>
              <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors text-white"
          aria-label="Toggle Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/5 px-6 py-4 flex flex-col gap-4 text-slate-300">
          <Link to="/" className="hover:text-white font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/booking" className="hover:text-white font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>Book Ride</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-white font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/profile" className="hover:text-white font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>Profile</Link>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="text-red-400 hover:text-red-300 text-left font-medium py-2 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary text-sm text-center py-2.5 mt-2" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

