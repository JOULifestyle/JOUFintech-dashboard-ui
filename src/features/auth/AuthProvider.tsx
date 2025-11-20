import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";
import { onAuthChange } from "./firebase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        console.log('Firebase user authenticated:', user.email);
        // Store user data for persistence
        localStorage.setItem('updatedUserData', JSON.stringify({ user, role: "user", timestamp: Date.now() }));
        setUser(user, "user");
      } else {
        console.log('No authenticated user found, user must sign in');
        localStorage.removeItem('updatedUserData');
        clearUser();
      }
      setInitialized(true);
    });

    return unsubscribe;
  }, []);

  // Don't render children until we've checked for stored auth
  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};
