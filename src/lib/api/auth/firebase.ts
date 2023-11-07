/**
    *
    * firebase setup
    */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC6-vHmFlnp_gIAo-8PvVDt-zLp_89v7mI",
    authDomain: "startup-fidget-io.firebaseapp.com",
    projectId: "startup-fidget-io",
    storageBucket: "startup-fidget-io.appspot.com",
    messagingSenderId: "763925514392",
    appId: "1:763925514392:web:086ca46b931ecb89dc28ed",
    measurementId: "G-1C3JWMPYBY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;