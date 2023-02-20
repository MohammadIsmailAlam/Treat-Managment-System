// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJCEe0xhShwMtPJyiCbjGRSg4cHpkBDrU",
  authDomain: "treat-management-system-691e2.firebaseapp.com",
  projectId: "treat-management-system-691e2",
  storageBucket: "treat-management-system-691e2.appspot.com",
  messagingSenderId: "994892144309",
  appId: "1:994892144309:web:298f24366b758dd5ac68fc",
  measurementId: "G-JPN20V8J65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = firebase.storage();

export { storage, firebase as default };