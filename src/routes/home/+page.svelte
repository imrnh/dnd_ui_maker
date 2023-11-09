<script lang="ts">
    // import { DatabaseClass } from "$lib/server/database/config";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import app, { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { faAdd, faArrowRightFromBracket, faBell, faCircleChevronDown, faSliders } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    import app_image from "$lib/assets/images/app-view-cover.png";
    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";
    // import getAllAppsForUser from "$lib/api/app_data/all_app_by_userid";

    let message = "";
    let responseData;

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
        }
    }

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: "",
    };

    let acc_options_holder: any;
    let acc_option_visible = false;

    function profileIconClickHandler() {
        acc_option_visible = !acc_option_visible;
    }

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
            }
        });
    });
</script>

<div class="home_wrapper">
    <div class="home_navbar">
        <div class="logo_wrapper">
            <img src={dummy_logo} alt="F" class="logo_img" />
            <p class="logo_name">Fidjet</p>
        </div>

        <div class="right_side_option_panes">
            <button class="notification_page_view_btn">
                <FontAwesomeIcon icon={faBell} />
            </button>
            <div class="personal_profile_options_wrapper">
                <button class="personal_acc_options_btn" on:click={profileIconClickHandler}>
                    <div class="button_inner_personal_acc_opts">
                        <p>{auth_state.user_name}</p>
                        <FontAwesomeIcon icon={faCircleChevronDown} style="font-size: 15px; margin-left: 20px; " />
                    </div>
                </button>
                {#if acc_option_visible}
                    <div class="personal_acc_options_holder" bind:this={acc_options_holder}>
                        <div class="option_group">
                            <FontAwesomeIcon style="font-size: 14px; margin-right: 15px;" icon={faSliders} />
                            <button class="acc_sett_button">Account Settings</button>
                        </div>
                        <div class="option_group">
                            <FontAwesomeIcon style="font-size: 14px; margin-right: 15px;" icon={faArrowRightFromBracket} />
                            <button class="logout_button">Logout</button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <div class="dick_color" />
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
                <a href={`/app?appid=${app.uid}`} style="text-decoration: none; color: black;">
                    <div class="app_view_card">
                        <p class="app_pricing_view_p">{app.pricing_plan}</p>
                        <!-- <img src={app.cover_img} alt="" /> -->
                        <p class="app_title_p">{app.name}</p>
                        <p class="app_last_edited">Edited {app.last_edited} hr ago</p>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    @import "./home.css";
</style>
