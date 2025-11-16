import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/authStore";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if user has explicitly logged out
    const hasLoggedOut = localStorage.getItem('hasLoggedOut') === 'true';

    if (!hasLoggedOut) {
      // Check for updated user data first
      const updatedUserData = localStorage.getItem('updatedUserData');

      let userToSet;
      if (updatedUserData) {
        try {
          const parsed = JSON.parse(updatedUserData);
          userToSet = parsed.user;
          console.log('Restoring updated user data:', userToSet.email);
        } catch (error) {
          console.error('Error parsing updated user data:', error);
          localStorage.removeItem('updatedUserData');
        }
      }

      // If still no user, use default mock user
      if (!userToSet) {
        userToSet = {
          email: "john.doe@example.com",
          displayName: "John Doe",
          uid: "mock-uid-123",
          emailVerified: true,
          isAnonymous: false,
          metadata: {},
          providerData: [],
          refreshToken: "mock-token",
          tenantId: null,
          delete: () => Promise.resolve(),
          getIdToken: () => Promise.resolve("mock-token"),
          getIdTokenResult: () => Promise.resolve({ token: "mock-token", claims: {}, signInProvider: "mock", signInSecondFactor: null, expirationTime: "", issuedAtTime: "", authTime: "" }),
          reload: () => Promise.resolve(),
          toJSON: () => ({}),
          phoneNumber: null,
          photoURL: null,
          providerId: "mock"
        };
        console.log('Auto-logging in default mock user:', userToSet.email);
      }

      setUser(userToSet, "user");
    } else {
      console.log('User has logged out, not auto-logging in');
      clearUser();
    }

    setInitialized(true);
  }, []);

  // Don't render children until we've checked for stored auth
  if (!initialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};
