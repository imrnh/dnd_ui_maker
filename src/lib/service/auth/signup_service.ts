import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app, { auth } from "./firebase";

export default class SignupService {

    public emailSignup(email: string, password: string, callback: any) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signedup: ", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                callback(errorCode, errorMessage);
            });
    }

    public resetPassword(new_password: string, callback: any) {

    }
}