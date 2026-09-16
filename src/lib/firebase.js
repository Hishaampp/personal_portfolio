// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_iITXJJ8ZtDb5ldZXEvA6wx4BHXbjtKA",
  authDomain: "hisham-portfolio-6ca4b.firebaseapp.com",
  projectId: "hisham-portfolio-6ca4b",
  storageBucket: "hisham-portfolio-6ca4b.firebasestorage.app",
  messagingSenderId: "533047646157",
  appId: "1:533047646157:web:fc23f2d41ee61704751684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)