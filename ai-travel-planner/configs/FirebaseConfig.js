// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDI9Ja6IBwHkDTUsCXYMuJKj-zOyF2R7-Q",
    authDomain: "ai-travel-planner-65eac.firebaseapp.com",
    projectId: "ai-travel-planner-65eac",
    storageBucket: "ai-travel-planner-65eac.firebasestorage.app",
    messagingSenderId: "369510138319",
    appId: "1:369510138319:web:5f91873b01f2b7c08352ba",
    measurementId: "G-MK384PE1N5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);