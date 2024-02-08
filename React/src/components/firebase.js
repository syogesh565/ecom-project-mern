import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCN5DzeiMLyO9PL4vA34d5HUzCWmTlmuSA",
    authDomain: "real-time-chat-39694.firebaseapp.com",
    projectId: "real-time-chat-39694",
    storageBucket: "real-time-chat-39694.appspot.com",
    messagingSenderId: "972438322597",
    appId: "1:972438322597:web:73bd7f44c0ea6031597c4c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
