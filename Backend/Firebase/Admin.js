import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBHzqKr-dhfSnA2v6S4gO52R8rtToUouHk",
    authDomain: "blog1011.firebaseapp.com",
    databaseURL: "https://blog1011-default-rtdb.firebaseio.com",
    projectId: "blog1011",
    storageBucket: "blog1011.appspot.com",
    messagingSenderId: "701407356867",
    appId: "1:701407356867:web:5651a7671438f64395ff76",
    measurementId: "G-011PWKCELC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };