import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

export default function GoogleAuthButton({ text = "Sign in with Google" }) {
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("email", user.email);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5"
      />
      {text}
    </button>
  );
}
