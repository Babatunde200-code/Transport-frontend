import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import parkImage from "../assets/park1.jpg";
import GoogleAuthButton from "../components/GoogleAuthButton";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://transport-2-0imo.onrender.com/api/login/",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // ✅ Update this route to your app page
    } catch (err) {
      setError("Invalid login credentials. Try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://transport-2-0imo.onrender.com/api/auth/google/";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#D0D3FF]">

      {/* LEFT SIDE */}
      <div
        className="md:w-1/2 w-full flex items-center justify-center text-white p-10"
        style={{
          backgroundImage: `url(${parkImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-40 p-10 rounded-3xl backdrop-blur-md">
          <h1 className="text-4xl font-semibold text-center">Welcome back!</h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label className="block mb-2 font-medium">Email Address</label>
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
              className="w-full mb-2 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-between items-center text-sm mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Keep me logged in
              </label>
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <div className="text-center my-4 text-gray-500">or continue with</div>

          <GoogleAuthButton text="Login with Google" />


          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
