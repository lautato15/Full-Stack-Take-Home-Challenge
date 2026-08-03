import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export function PublicRoute() {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
