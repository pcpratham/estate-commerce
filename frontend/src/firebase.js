// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-commerce.firebaseapp.com",
  projectId: "estate-commerce",
  storageBucket: "estate-commerce.appspot.com",
  messagingSenderId: "952651387934",
  appId: "1:952651387934:web:d137306d09316902208a0f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);