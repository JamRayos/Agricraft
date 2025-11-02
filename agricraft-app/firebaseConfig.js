import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyASMF4JoaSVQAbbaWbRi9NGgNjjYc1KE4Q",
    authDomain: "agricraft-market.firebaseapp.com",
    projectId: "agricraft-market",
    storageBucket: "agricraft-market.firebasestorage.app",
    messagingSenderId: "519072939525",
    appId: "1:519072939525:web:8b6b751ecfccbb2ae9e66c",
    measurementId: "G-KJJ63M068V"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
