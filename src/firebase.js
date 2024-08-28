import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfyVDzga0D8Di3fRlyrx0-fKnmE4qPTno",
  authDomain: "portfoilo-projects.firebaseapp.com",
  projectId: "portfoilo-projects",
  storageBucket: "portfoilo-projects.appspot.com",
  messagingSenderId: "103449350617",
  appId: "1:103449350617:web:dceca52a67f5165a2f09c8",
  databaseURL: "https://portfoilo-projects.firebaseio.com",
  measurementId: "G-B7GG3CLC0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);