// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAn2ZWrWmwi7t0_90xHIWHdgwvyGG3q5Os",
    authDomain: "live-chat-ab9bc.firebaseapp.com",
    projectId: "live-chat-ab9bc",
    storageBucket: "live-chat-ab9bc.firebasestorage.app",
    messagingSenderId: "133103405115",
    appId: "1:133103405115:web:d37812ead8135065a6f41e",
    measurementId: "G-84DTF47GDL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
