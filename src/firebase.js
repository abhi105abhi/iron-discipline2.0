import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3zUkXcT-oQjvCpMLb3caIYsmSWoGWPDY",
  authDomain: "sudhar-ja.firebaseapp.com",
  projectId: "sudhar-ja",
  storageBucket: "sudhar-ja.firebasestorage.app",
  messagingSenderId: "893000798529",
  appId: "1:893000798529:web:5e70481b524802dae0d1c0",
  measurementId: "G-XG6F9M46GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances for the rest of the app
export const db = getFirestore(app);
export const auth = getAuth(app);
