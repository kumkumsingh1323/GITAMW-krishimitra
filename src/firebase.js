import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMkltLCoA1fJcFuEcCKZYRrlJINz6SSaI",
  authDomain: "krishimitra-676d0.firebaseapp.com",
  projectId: "krishimitra-676d0",
  storageBucket: "krishimitra-676d0.firebasestorage.app",
  messagingSenderId: "351971117131",
  appId: "1:351971117131:web:6e1c68ab0eb2445c1025ce",
  measurementId: "G-58NXKNWY66"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
