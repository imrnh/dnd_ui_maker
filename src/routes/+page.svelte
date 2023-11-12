<script lang="ts">
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { faAdd } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import format_last_edited from "$lib/utilities/format_last_edited";

    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";

    let apps: IApp[] = [];

    async function getAllAppsByThisUser(user_id: string) {
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
            apps = response_data.apps;
            apps = apps.reverse(); //to get newly created apps at the top.
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
                getAllAppsByThisUser(auth_state.uid);
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
</script>

<div class="home_wrapper">
    <section class="app_view_section">
        <div class="app_view_header">
            <h1 style="font-size: 40px;">All Apps</h1>
            <button on:click={() => goto("/app/create-app")} class="app_new_button">
                <FontAwesomeIcon icon={faAdd} /> &nbsp;&nbsp;
                <p>Create new app</p>
            </button>
        </div>

        <!-- created apps view -->
        <div class="app_view_cards_holder">
            {#each apps as app}
                <a href={`/home/app?appid=${app.uid}`} style="text-decoration: none; color: black;">
                    <div class="app_view_card">
                        <p class="app_pricing_view_p">{app.pricing_plan}</p>
                        <p class="app_title_p">{app.name}</p>
                        <p class="app_last_edited">Edited {format_last_edited(app.last_edited)} ago</p>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    @import "$css/home.css";
</style>
