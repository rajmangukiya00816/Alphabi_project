import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvrJjN8GYHsmF9UShCuvRStPZ2CRSEHBE",
  authDomain: "nextjs-firebase-auth-847ad.firebaseapp.com",
  projectId: "nextjs-firebase-auth-847ad",
  storageBucket: "nextjs-firebase-auth-847ad.appspot.com",
  messagingSenderId: "35686343570",
  appId: "1:35686343570:web:36c1f0e4b3c3e6bd00174b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()