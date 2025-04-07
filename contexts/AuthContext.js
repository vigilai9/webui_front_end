"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebaseconfig"; // Adjust path if needed

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && currentUser) {
      router.push("/"); // Redirect only if user is logged in
    }
  }, [currentUser, loading, router]);

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Get and store token in localStorage for testing
      const token = await result.user.getIdToken();
      localStorage.setItem("firebase_auth_token", token);
      router.push("/"); // Redirect after login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      router.push("/login"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, signInWithGoogle, signOut }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}
