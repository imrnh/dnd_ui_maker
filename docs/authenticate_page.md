```
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import type { IAuthState } from "$lib/interfaces/root/app_interaface";

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: null,
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            auth_state.authenticated = true;
            auth_state.uid = user.uid;
            auth_state.user_name = user.displayName;
        } else {
            auth_state.authenticated = false;
            auth_state.uid = null;
            auth_state.user_name = null;
        }
    });


```