import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/auth/signin" replace />;

  return <>{children}</>;
};
