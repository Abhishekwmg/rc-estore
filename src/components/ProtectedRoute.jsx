// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Firebase user from context
  if (!user) {
    // User not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  return children; // User is logged in → render children
};
