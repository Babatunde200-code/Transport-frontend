import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth/web-extension";

export default function GoogleAuthButton({ text = "Continue with Google" }) {
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save info
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("email", user.email);

      window.location.href = "/";  
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      alert("Google login failed");
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
