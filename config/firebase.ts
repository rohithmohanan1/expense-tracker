// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-E9RBiIskSSn4gsAhaEop9NOBDtUIZDo",
  authDomain: "expense-tracker-c3c97.firebaseapp.com",
  projectId: "expense-tracker-c3c97",
  storageBucket: "expense-tracker-c3c97.firebasestorage.app",
  messagingSenderId: "113456587665",
  appId: "1:113456587665:web:16edefa3c49f64af04b030",
  measurementId: "G-H72FJB14HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

// db
export const db = getFirestore(app)