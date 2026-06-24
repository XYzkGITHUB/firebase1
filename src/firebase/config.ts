'use client';

/**
 * Firebase configuration object.
 * The projectId has been updated to match your console: 'flam-next-js'
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD-placeholder-key",
  authDomain: "flam-next-js.firebaseapp.com",
  projectId: "flam-next-js",
  storageBucket: "flam-next-js.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
