import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check for stored user data (from actual login, not auto-login)
    const updatedUserData = localStorage.getItem('updatedUserData');

    if (updatedUserData) {
      try {
        const parsed = JSON.parse(updatedUserData);
        const userToSet = parsed.user;
        console.log('Restoring authenticated user data:', userToSet.email);
        setUser(userToSet, "user");
      } catch (error) {
        console.error('Error parsing updated user data:', error);
        localStorage.removeItem('updatedUserData');
        clearUser();
      }
    } else {
      console.log('No authenticated user found, user must sign in');
      clearUser();
    }

    setInitialized(true);
  }, []);

  // Don't render children until we've checked for stored auth
  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};
