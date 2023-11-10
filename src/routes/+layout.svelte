<script lang="ts">
    import Modal from "./Modal.svelte";
    let modal;

    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { onAuthStateChanged } from "firebase/auth";

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
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
</script>

<html lang="en">
    <body style="position: fixed;">
        <slot />
        <Modal bind:this={modal} />
    </body>
</html>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
    * {
        margin: 0;
    }

    body {
        margin: 0;
        font-family: "Inter", sans-serif;
        position: relative;
        background-color: rgb(255, 252, 252);
        overflow: auto;
    }

    *:focus {
        outline: none;
    }
</style>
