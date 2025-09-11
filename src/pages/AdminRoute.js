import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_staff") === "true"; // ✅

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/booking" />; // redirect non-admins
  }

  return children;
};
