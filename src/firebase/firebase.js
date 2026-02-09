// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rc-store-2fe4e.firebaseapp.com",
  projectId: "rc-store-2fe4e",
  storageBucket: "rc-store-2fe4e.firebasestorage.app",
  messagingSenderId: "418261922876",
  appId: "1:418261922876:web:69888fdf58b6b71f90bf39",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
