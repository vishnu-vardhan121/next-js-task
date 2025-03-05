// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAtBqRUhfkp06-NRjpfDnptcUWQxrLFC6M",
  authDomain: "dashboard-7805c.firebaseapp.com",
  projectId: "dashboard-7805c",
  storageBucket: "dashboard-7805c.firebasestorage.app",
  messagingSenderId: "585766856289",
  appId: "1:585766856289:web:1fdf39fa473e4abc44ec20",
  measurementId: "G-2WC9CFCM7E",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
