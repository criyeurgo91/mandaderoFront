importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBVDTo3sJj6mZ3xzvivSn2EkGh0lS2EGlU",
  authDomain: "mandersdev.firebaseapp.com",
  databaseURL: "https://mandersdev-default-rtdb.firebaseio.com",
  projectId: "mandersdev",
  storageBucket: "mandersdev.appspot.com",
  messagingSenderId: "76782946615",
  appId: "1:76782946615:web:53d337f2c39f9139e972b2",
  measurementId: "G-7RH7132411"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Nueva Solicitudtittle';
  const notificationOptions = {
    body: 'Tienes una nueva solicitud',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
