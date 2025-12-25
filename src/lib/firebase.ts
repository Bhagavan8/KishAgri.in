import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: atob(import.meta.env.VITE_FIREBASE_API_KEY || ''),
  authDomain: atob(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || ''),
  projectId: atob(import.meta.env.VITE_FIREBASE_PROJECT_ID || ''),
  storageBucket: atob(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || ''),
  messagingSenderId: atob(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''),
  appId: atob(import.meta.env.VITE_FIREBASE_APP_ID || ''),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? atob(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) : undefined
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;