import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  type User
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkxEMKbR4zoHbyn5EAuI4ztJV07gZvRZ4",
  authDomain: "jou-finance.firebaseapp.com",
  projectId: "jou-finance",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set persistence to local storage so auth state survives page refreshes
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Firebase persistence error:", error);
});

// Auth functions
export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUp = async (email: string, password: string, displayName?: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
};

export const logout = () => signOut(auth);

// Subscribe to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
