import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyASMF4JoaSVQAbbaWbRi9NGgNjjYc1KE4Q",
    authDomain: "agricraft-market.firebaseapp.com",
    projectId: "agricraft-market",
    storageBucket: "agricraft-market.appspot.com",
    messagingSenderId: "519072939525",
    appId: "1:519072939525:web:8b6b751ecfccbb2ae9e66c",
    measurementId: "G-KJJ63M068V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };