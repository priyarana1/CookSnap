import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBTlxqUawpHuCxXLP0oQGdachSPVMvvr2I",
  authDomain: "tastebuds-40a88.firebaseapp.com",
  projectId: "tastebuds-40a88",
  storageBucket: "tastebuds-40a88.appspot.com", // FIXED .com
  messagingSenderId: "20512280617",
  appId: "1:20512280617:web:e99a98deabe12630d94c38",
};

// Initialize Firebase (prevent duplicate inits)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get the Auth instance
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, db, storage };
