import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("access");
  const isStaff = localStorage.getItem("is_staff") === "true";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isStaff) {
    return <Navigate to="/booking" replace />; // non-admins go to booking
  }

  return children;
}
