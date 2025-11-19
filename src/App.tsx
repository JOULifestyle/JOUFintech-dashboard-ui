import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

// Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Transactions from "./pages/transactions/Transactions";
import Wallets from "./pages/wallets/Wallets";
import Charts from "./pages/charts/Charts";
import Settings from "./pages/settings/Settings";
import Investments from "./pages/investments/Investments";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Stores
import { useAuthStore } from "./stores/authStore";
import { useUIStore } from "./stores/uiStore";

// Toast
import Toast from "./components/Toast";

// React Query
const queryClient = new QueryClient();

// RequireAuth component
function RequireAuth({ children, roles }: { children: ReactNode; roles?: string[] }) {
  const { user, role } = useAuthStore();
  if (!user) return <Navigate to="/auth/signin" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// Main App component
export default function App() {
  const initializeTheme = useUIStore((s) => s.initializeTheme);

  useEffect(() => {
    // Initialize dark/light/system theme on app start
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toast />
        <Routes>
          {/* Auth Pages */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          {/* Root redirects to signin */}
          <Route path="/" element={<Navigate to="/auth/signin" replace />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <DashboardHome />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/transactions"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Transactions />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/wallets"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Wallets />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/investments"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Investments />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/charts"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Charts />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </RequireAuth>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
