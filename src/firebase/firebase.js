// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVDTo3sJj6mZ3xzvivSn2EkGh0lS2EGlU",
  authDomain: "mandersdev.firebaseapp.com",
  databaseURL: "https://mandersdev-default-rtdb.firebaseio.com",
  projectId: "mandersdev",
  storageBucket: "mandersdev.appspot.com",
  messagingSenderId: "76782946615",
  appId: "1:76782946615:web:53d337f2c39f9139e972b2",
  measurementId: "G-7RH7132411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);