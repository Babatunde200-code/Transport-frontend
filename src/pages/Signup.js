import React, { useState } from "react";
import axios from "axios";
import useGoogleAuth from "../hooks/useGoogleAuth";
import { useNavigate } from "react-router-dom";
import parkImage from "../assets/park.jpg"; //
import asapLogo from "../assets/Asap_logo.png";

const Signup = () => {
  const handleGoogleAuth = useGoogleAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
       await axios.post(
        "https://transport-2-0imo.onrender.com/api/signup/",
        {
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }
      );

      setSuccess("Signup successful! Please check your email to verify.");
      setTimeout(() => navigate("/verify"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        Object.values(err.response?.data).flat().join(", ") ||
        "Signup failed. Try again."
      );
    }
  };

  // ✅ Google signup handler (placeholder for now)
  const handleGoogleSignup = () => {
    window.location.href = "https://transport-2-0imo.onrender.com/api/auth/google/";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#D0D3FF]">

      {/* LEFT PANEL */}
      <div
        className="md:w-1/2 w-full flex items-center justify-center text-white p-10"
        style={{
          backgroundImage: `url(${parkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-40 p-10 rounded-3xl backdrop-blur-md flex justify-center">
      <img
        src={asapLogo}
        alt="ASAP Travels Logo"
        className="w-48" // adjust logo size here (w-32, w-40, w-52 ...)
      />
    </div>
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          {error && <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-3">{error}</div>}
          {success && <div className="bg-green-100 text-green-600 px-4 py-2 rounded-md mb-3">{success}</div>}

          <form onSubmit={handleSignup}>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="w-full mb-4 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="w-full mb-4 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full mb-6 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Create Account
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or</div>

          <button
      onClick={() => handleGoogleAuth(navigate)}
      className="w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
    >
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5" />
      Sign up with Google
    </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
