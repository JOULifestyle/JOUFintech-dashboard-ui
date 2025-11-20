import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/AuthProvider";
import useDarkMode from "./hooks/useDarkMode";
import { useNotificationStore } from "./stores/notificationStore";
import { useUIStore } from "./stores/uiStore";
import { api } from "./api/client";

// MSW setup
import { worker } from "./mocks/browser";

// React Query client with better error handling and retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors, but retry network errors and MSW timing issues
        const axiosError = error as { response?: { status: number } } | undefined;
        if (axiosError?.response?.status && axiosError.response.status >= 400 && axiosError.response.status < 500) {
          return false;
        }
        // Retry failed requests up to 5 times for network/MSW issues
        if (failureCount < 5) {
          return true;
        }
        return false;
      },
      retryDelay: (attemptIndex) => Math.min(500 * 2 ** attemptIndex, 10000), // Faster retries
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      networkMode: 'always', // Always try network requests
    },
  },
});

// Start MSW
console.log('🚀 Starting MSW worker...');

// Start MSW synchronously
worker.start({
  onUnhandledRequest: 'bypass',
  quiet: false,
  serviceWorker: {
    url: '/mockServiceWorker.js',
    options: {
      scope: '/'
    }
  }
}).then(() => {
  console.log('✅ MSW worker started successfully');
}).catch((error) => {
  console.error('❌ Failed to start MSW worker:', error);
  // Fallback: try to start without service worker options
  console.log('🔄 Retrying MSW startup...');
  worker.start({
    onUnhandledRequest: 'bypass',
    quiet: false
  }).catch((retryError) => {
    console.error('❌ MSW startup failed completely:', retryError);
  });
});

// Apply initial theme, currency and load notifications
function AppInitializer() {
  useDarkMode(); // Initialize the hook to set the theme on app start

  const { setNotifications } = useNotificationStore();
  const { initializeCurrency } = useUIStore();

  React.useEffect(() => {
    // Initialize currency from localStorage
    initializeCurrency();

    // Load notifications on app start
    const loadNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data);
      } catch {
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
  }, [setNotifications, initializeCurrency]);

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
