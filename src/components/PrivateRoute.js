import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" replace />;
}

export function AdminRoute({ children }) {
  const token = localStorage.getItem("access");
  const isStaff = localStorage.getItem("is_staff") === "true";

  if (!token) return <Navigate to="/login" replace />;
  if (!isStaff) return <Navigate to="/booking" replace />; // normal users go to booking

  return children;
}
