import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const decode = (value: string | undefined) => {
  try {
    return value ? atob(value.trim()) : '';
  } catch (e) {
    console.error('Error decoding Firebase config:', e);
    return '';
  }
};

const firebaseConfig = {
  apiKey: decode(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: decode(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: decode(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: decode(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: decode(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: decode(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? decode(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) : undefined
};

console.log('Firebase Config Debug:', {
  apiKeyExists: !!firebaseConfig.apiKey,
  apiKeyLength: firebaseConfig.apiKey?.length,
  projectId: firebaseConfig.projectId
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;