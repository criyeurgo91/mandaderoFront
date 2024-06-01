importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

 //the Firebase config object 
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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});