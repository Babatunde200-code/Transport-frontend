import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Verify account
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/verify/",
        {
          email: formData.email,
          code: formData.code,
        }
      );
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend code
  const handleResend = async () => {
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/resend-code/",
        { email: formData.email }
      );
      setSuccess(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Failed to resend code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Verify Your Account
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

        <form onSubmit={handleVerify}>
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

          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Verification Code</label>
            <input
              type="text"
              name="code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Enter 6-digit code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {loading ? "Resending..." : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default Verify;
