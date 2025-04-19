
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMaXqKXWpMa_x0xN2bec7MueZfqDJhGIk",
  authDomain: "chat-app-c2f1e.firebaseapp.com",
  projectId: "chat-app-c2f1e",
  storageBucket: "chat-app-c2f1e.firebasestorage.app",
  messagingSenderId: "106623296848",
  appId: "1:106623296848:web:b2d888da8beec9b90f3855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);