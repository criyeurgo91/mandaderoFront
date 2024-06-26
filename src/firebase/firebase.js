import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getDatabase, ref, set } from 'firebase/database';

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
const messaging = getMessaging(app);
const database = getDatabase(app);

const saveTokenToDatabase = async (token) => {
    try {
        await set(ref(database, 'Manders/Tokens/admin/'), {
            token: token,
        });
        console.log('Token saved to Realtime Database.');
    } catch (error) {
        console.error('Error saving token to Realtime Database: ', error);
    }
};

export const requestPermission = () => {
    console.log("Requesting User Permission...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: 'BGfk8Sl0S2E31zbEff4iGXggfW3-ayaEJlb9_inj2yWT4yNVmRFGNGBFcRiOcuebFJG-2V4U_SiI14U7luiMV1Y' })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('Client Token: ', currentToken);
                        saveTokenToDatabase(currentToken); // Guarda el token en Realtime Database
                    } else {
                        console.log('Failed to generate the app registration token.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred when requesting to receive the token.', err);
                });
        } else {
            console.log("User Permission Denied.");
        }
    });
};

requestPermission();

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
