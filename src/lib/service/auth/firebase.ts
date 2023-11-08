/**
    *
    * firebase setup
    */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_AUTH_DOMAIN, PUBLIC_FIREBASE_AUTH_PROJECT_ID, PUBLIC_STORAGE_BUCKET, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_FIREBASE_APP_ID, PUBLIC_FIREBASE_MEASUREMENT_ID } from "$env/static/public";


const firebaseConfig = {
    apiKey: PUBLIC_FIREBASE_API_KEY,
    authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: PUBLIC_FIREBASE_AUTH_PROJECT_ID,
    storageBucket: PUBLIC_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
    appId: PUBLIC_FIREBASE_APP_ID,
    measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;