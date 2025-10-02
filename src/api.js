import axios from "axios";

const API = axios.create({
  baseURL: "https://transport-2-0imo.onrender.com", // or your Render URL
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // works for both user & admin
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("➡️ Request headers:", config.headers);
  }
  return config;
});

export default API;
