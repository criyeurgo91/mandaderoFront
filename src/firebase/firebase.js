// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { app, analytics, db, messaging, onMessage, getToken };
