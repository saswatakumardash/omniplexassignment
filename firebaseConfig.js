import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyA7qPFM559Tq98aQr8HAN8GQH9isvWbkQg",
  authDomain: "scam-2025.firebaseapp.com",
  projectId: "scam-2025",
  storageBucket: "scam-2025.firebasestorage.app",
  messagingSenderId: "377711019637",
  appId: "1:377711019637:web:ff7da7d8700f2b25169a3c",
  measurementId: "G-WZ230GCFTJ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
