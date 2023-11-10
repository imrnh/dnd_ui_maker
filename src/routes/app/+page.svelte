<script lang="ts">
    import AllPagesView from "./components/all_pages_view.svelte";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";
    import { page } from "$app/stores";

    const url = $page.url;
    const param_appid: string = url.searchParams.get("appid")!;
    console.log();
    let app_data: any | null = null;

    async function post_request(app_id: string) {
        const data = new FormData();
        data.append("appid", app_id);

        const response = await fetch("/api/app_data", {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        if (response_data.success) {
            app_data = response_data.app_data;
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
                post_request(param_appid); //search only if authenticated.
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
</script>



{#if app_data != null}
    <main class="main_apps_info_wrapper">
        <div class="apps_info_wrapper">
            <div class="apps_sidebar">sidebar</div>

            <div class="page_view_section">
                <h1>{app_data.name}</h1>
                <AllPagesView />
            </div>
        </div>
    </main>
{:else}
    <div class="app_not_found_notice">
        <h1>App not found</h1>
    </div>
{/if}

<style>
    .main_apps_info_wrapper {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: start;
        margin-top: 50px;
    }
    .apps_info_wrapper {
        width: 1200px;
        height: auto;
        margin-top: 10px;
        display: flex;
        align-items: start;
    }
    .apps_sidebar {
        width: 350px;
        min-height: 100vh;
    }

    .page_view_section {
        width: 770px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .page_view_section h1{
        font-size: 50px;
    }
    .app_not_found_notice {
        display: flex;
        width: 100vw;
        height: 300px;
        align-items: center;
        justify-content: center;
    }
</style>
