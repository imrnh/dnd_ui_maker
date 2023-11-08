<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: null,
    };

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth_state.authenticated = true;
                auth_state.uid = user.uid;
                auth_state.user_name = user.displayName;

                goto("/home");
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
</script>
