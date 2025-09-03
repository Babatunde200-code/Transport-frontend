import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/signup/",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Signup response:", res.data); // 👀 log server response

      setSuccess("Signup successful! Please check your email to verify.");
      setTimeout(() => navigate("/verify"), 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Signup failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
