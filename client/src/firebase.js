// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmSkyNFIGLNo06sM6dTZm6XbTBcZ-46pU",
  authDomain: "social-app-75667.firebaseapp.com",
  projectId: "social-app-75667",
  storageBucket: "social-app-75667.appspot.com",
  messagingSenderId: "401566480957",
  appId: "1:401566480957:web:1a780a67698fab37b14854",
  measurementId: "G-7ZWM145B2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
