```
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";

    let app_data;

    async function post_request(user_id: string) {
        const data = new FormData();
        data.append("usrid", user_id);

        const response = await fetch("/api/all_apps_by_userid", {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        if (response_data.success) {
            app_data = response_data.app_data;
            app_data = app_data.reverse(); //to get newly created apps at the top.
        }
    }

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: "",
    };

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth_state.authenticated = true;
                auth_state.uid = user.uid;
                auth_state.user_name = user.displayName;
                post_request(auth_state.uid);
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
    ```