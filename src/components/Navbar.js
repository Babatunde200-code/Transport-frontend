// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../services/auth';

const Navbar = () => {
  const user = getUserInfo(); // ✅ Call inside the component

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        🌍 ASAP TRAVELS
      </Link>

      <div className="text-sm text-gray-600">
        Welcome, {user?.email || 'Guest'}
      </div>
    </nav>
  );
};

export default Navbar;
