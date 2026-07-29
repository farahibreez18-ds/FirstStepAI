import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJJ-GHoNVf6AOEYcXM0uIjNMKYKrBMYDs",
  authDomain: "firststepai-4d49f.firebaseapp.com",
  projectId: "firststepai-4d49f",
  storageBucket: "firststepai-4d49f.firebasestorage.app",
  messagingSenderId: "882889680970",
  appId: "1:882889680970:web:bc817187be7d68ed0f9eb3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log(import.meta.env.VITE_GROQ_API_KEY);