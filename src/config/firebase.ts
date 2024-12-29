import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJ6L2bk09PHgRZlC9trC84yt22cyY3wuo",
  authDomain: "packy-76eb9.firebaseapp.com",
  projectId: "packy-76eb9",
  storageBucket: "packy-76eb9.firebasestorage.app",
  messagingSenderId: "494484402050",
  appId: "1:494484402050:web:0852673662beb68d29299b",
  measurementId: "G-Q1W4B9LB6T"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); 