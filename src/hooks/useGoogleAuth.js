import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import axios from "axios";

export default function useGoogleAuth() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleAuth = async (navigate) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user email or token to backend for login/signup
      const response = await axios.post(
        "https://transport-2-0imo.onrender.com/api/google-auth/",
        { email: user.email, name: user.displayName }
      );

      // Save token returned by backend
      localStorage.setItem("token", response.data.token);

      // Redirect to Dashboard or Booking page
      navigate("/book");

    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };

  return handleGoogleAuth;
}
