import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from "firebase/auth";
import app, { auth } from "./firebase";
import { goto } from '$app/navigation';

export default class LoginService {
    public emailLogin(email: string, password: string, callback: any) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                callback(errorCode, errorMessage);
            });
    }


    public googleLogin(callback: any) {
        const g_provider = new GoogleAuthProvider();
        signInWithPopup(auth, g_provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result); // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)

                console.log("Google auth: ", user.uid, "\t", user.displayName);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                callback(errorCode, errorMessage);

                // The email of the user's account used.
                const email = error.customData.email;

                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    public facebookLogin(callback: any) {
        const f_provider = new FacebookAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, f_provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                callback(errorCode, errorMessage);

                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });

    }

    public sendResetLink(email: string) {

    }

    public logout(callback: any) {
        signOut(auth).then(() => {
            goto("/")
        }).catch((error) => {
            callback(error.code, error.message);z
        });

    }
}