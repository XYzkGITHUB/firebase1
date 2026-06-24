'use client';

/**
 * Firebase configuration object.
 * IMPORTANT: Replace the placeholders below with values from your Firebase Console:
 * Project Settings -> Your Apps -> Firebase SDK snippet -> Config
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "REPLACE_WITH_YOUR_ACTUAL_API_KEY",
  authDomain: "flam-next-js.firebaseapp.com",
  projectId: "flam-next-js",
  storageBucket: "flam-next-js.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
