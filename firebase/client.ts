// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHpOpRz8FzDMmBOXHIg8xATV6IhvcLrzo",
  authDomain: "prepwise-be1c9.firebaseapp.com",
  projectId: "prepwise-be1c9",
  storageBucket: "prepwise-be1c9.firebasestorage.app",
  messagingSenderId: "858624628142",
  appId: "1:858624628142:web:5b3d9861fff4cea2be243f",
  measurementId: "G-FQKK9C3TRR",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
