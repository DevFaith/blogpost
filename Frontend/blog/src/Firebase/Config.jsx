// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHzqKr-dhfSnA2v6S4gO52R8rtToUouHk",
    authDomain: "blog1011.firebaseapp.com",
    projectId: "blog1011",
    storageBucket: "blog1011.appspot.com",
    messagingSenderId: "701407356867",
    appId: "1:701407356867:web:5651a7671438f64395ff76",
    measurementId: "G-011PWKCELC"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, analytics };