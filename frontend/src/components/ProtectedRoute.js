import React from "react";
import { useSelector } from "react-redux"; // Import the selector from your authSlice
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((store) => store.user);

  if (!authUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
