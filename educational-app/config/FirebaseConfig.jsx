// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: "projects-2025-2b92e.firebaseapp.com",
  projectId: "projects-2025-2b92e",
  storageBucket: "projects-2025-2b92e.firebasestorage.app",
  messagingSenderId: "540379548934",
  appId: "1:540379548934:web:3def9d17ad9d72c5542287",
  measurementId: "G-799W8L12ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);
const analytics = getAnalytics(app);