<script lang="ts">
    import CompCanvas from "$lib/components/studio/canvas/comp_canvas.svelte";
    import FnCanvas from "$lib/components/studio/canvas/fn_canvas.svelte";
    import Uicanvas from "$lib/components/studio/canvas/uicanvas.svelte";
    import Sidebar from "$lib/components/studio/sidebar/sidebar.svelte";

    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/api/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";

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
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;
            }
        });
    });
</script>

{#if auth_state.authenticated}
    <div class="pagebody">
        <div class="sidebar">
            <Sidebar />
        </div>

        <div class="nav">
            <!-- Nav content here -->
        </div>

        <div class="canvas_holder">
            <Uicanvas />
            <FnCanvas />
        </div>
    </div>
{/if}

<style>
    .pagebody {
        width: 100vw;
        height: calc(100vh - 60px);
        display: flex;
        overflow: hidden;
    }

    .nav {
        width: 100vw;
        height: 60px;
        border-bottom: 1px solid rgb(235, 235, 235);
        z-index: 100;
        background-color: white;
    }
    .sidebar {
        width: calc(280px + 60px);
        height: calc(100vh - 60px);
        border-right: 1px solid rgb(230, 230, 230);
        position: absolute;
        top: 60px;
        z-index: 10;
        background-color: white;
    }
    .canvas_holder {
        width: 100vw;
        height: 100vh;
        display: flex;
        position: absolute;
        overflow: scroll;
        z-index: 0;
    }

    /* For Webkit-based browsers (Google Chrome, Safari) */
    /* Modify the track (the area the thumb moves in) */
    .canvas_holder::-webkit-scrollbar {
        width: 5px; /* Set the width of the scrollbar */
        height: 5px;
    }

    /* Modify the thumb (the draggable part) */
    .canvas_holder::-webkit-scrollbar-thumb {
        background: #888; /* Set the color of the thumb */
        border-radius: 6px; /* Set the rounded corners of the thumb */
    }

    /* Modify the track (the area the thumb moves in) on hover */
    .canvas_holder::-webkit-scrollbar-thumb:hover {
        background: #222222; /* Change the thumb color on hover */
    }

    /* For Firefox */
    /* Modify the track (the area the thumb moves in) */
    /* Note: Firefox requires a specific width and background color */
    /* for the scrollbar-track to work properly */
    .canvas_holder {
        scrollbar-width: thin;
        scrollbar-color: #888 #f5f5f5;
    }

    /* Modify the thumb (the draggable part) in Firefox */
    .canvas_holder {
        scrollbar-thumb-color: #888;
    }
</style>
