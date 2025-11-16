import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/AuthProvider";
import useDarkMode from "./hooks/useDarkMode";
import { useNotificationStore } from "./stores/notificationStore";
import { api } from "./api/client";

const queryClient = new QueryClient();

// Start MSW in dev mode
if (import.meta.env.DEV) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass'
    });
  });
}

// ✅ Apply initial theme and load notifications
function AppInitializer() {
  useDarkMode(); // Initialize the hook to set the theme on app start

  const { setNotifications } = useNotificationStore();

  React.useEffect(() => {
    // Load notifications on app start
    const loadNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch (error) {
        // Fallback: load mock notifications directly if API fails
        const mockNotifications = [
          {
            id: "1",
            title: "Welcome to JOU Finance!",
            message: "Thanks for joining us. Start by adding your first transaction to track your finances.",
            type: "info" as const,
            isRead: false,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "2",
            title: "Savings Goal Progress",
            message: "You're 75% towards your Emergency Fund goal! Keep up the great work.",
            type: "success" as const,
            isRead: false,
            createdAt: new Date(Date.now() - 43200000).toISOString(),
          },
          {
            id: "3",
            title: "High Spending Alert",
            message: "Your grocery spending this month is 20% higher than last month. Consider reviewing your budget.",
            type: "warning" as const,
            isRead: true,
            createdAt: new Date(Date.now() - 21600000).toISOString(),
          },
          {
            id: "4",
            title: "Investment Update",
            message: "Your Tech Stocks portfolio has gained 2.5% in the last week.",
            type: "info" as const,
            isRead: false,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        ];
        setNotifications(mockNotifications);
      }
    };

    loadNotifications();
  }, [setNotifications]);

  return null; // nothing to render
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppInitializer />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
