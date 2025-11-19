import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// ^ IMPORTANT: firebase v12 requires /web-extension for auth

const firebaseConfig = {
  apiKey: "AIzaSyCgxUX2LXojOmWmMReQRnxVrVein-dmNNg",
  authDomain: "asaptravels-64c1d.firebaseapp.com",
  projectId: "asaptravels-64c1d",
  storageBucket: "asaptravels-64c1d.firebasestorage.app",
  messagingSenderId: "905707659724",
  appId: "1:905707659724:web:a72f9f145812ac6c58fd69",
  measurementId: "G-477FSN6WFP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup };