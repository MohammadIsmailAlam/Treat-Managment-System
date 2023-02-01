// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo7fucOjuNxUqozXxu9WU0jUZNEVjnlNw",
  authDomain: "treat-management-system.firebaseapp.com",
  projectId: "treat-management-system",
  storageBucket: "treat-management-system.appspot.com",
  messagingSenderId: "798104505950",
  appId: "1:798104505950:web:de4b1db4ab5e8859e6eecf",
  measurementId: "G-P09LXW0GXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);