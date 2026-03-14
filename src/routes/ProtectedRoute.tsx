import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Role } from "../types";

interface Props {
  allowedRoles?: Role[];
}

/**
 * A wrapper component to protect private routes.
 * 1. Checks if a user is logged in (accessToken exists).
 * 2. Optionally checks if the user's role matches the required roles.
 */
export default function ProtectedRoute({ allowedRoles }: Props) {
  const { accessToken, user } = useAuthStore();

  // If not logged in, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if the user has permission
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If unauthorized for this specific role (e.g., User trying to access Admin),
    // redirect them to the general dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the child routes (the "Outlet")
  return <Outlet />;
}