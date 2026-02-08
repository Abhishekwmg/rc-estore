// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // 🔹 wait until auth is initialized
  if (!user) return <Navigate to="/login" />;

  return children;
}
