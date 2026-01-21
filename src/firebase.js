import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase console se details yahan paste kariyo
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "iron-discipline.firebaseapp.com",
  projectId: "iron-discipline",
  storageBucket: "iron-discipline.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
