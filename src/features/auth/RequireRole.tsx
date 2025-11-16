import { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Navigate } from "react-router-dom";

export const RequireRole = ({
  role,
  children,
}: {
  role: "user" | "admin";
  children: ReactNode;
}) => {
  const userRole = useAuthStore((state) => state.role);

  if (!userRole || userRole !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};
