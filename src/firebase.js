// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgxUX2LXojOmWmMReQRnxVrVein-dmNNg",
  authDomain: "asaptravels-64c1d.firebaseapp.com",
  projectId: "asaptravels-64c1d",
  storageBucket: "asaptravels-64c1d.firebasestorage.app",
  messagingSenderId: "905707659724",
  appId: "1:905707659724:web:a72f9f145812ac6c58fd69",
  measurementId: "G-477FSN6WFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };