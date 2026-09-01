// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in (e.g., checking localStorage or a cookie/auth state)
    // For cookie-only tracking, you might check if a user object exists in localStorage or context.
    const isAuthenticated = localStorage.getItem("userInfo");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;