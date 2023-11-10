<script lang="ts">
    import logo from "$lib/assets/dummy_logo.png";
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { faAdd, faArrowRightFromBracket, faBell, faCircleChevronDown, faSliders } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import format_last_edited from "$lib/utilities/format_last_edited";

    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";
    import LoginService from "$lib/service/auth/login_service";

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

                goto("/auth/login");
            }
        });
    });
</script>

<div class="home_wrapper">
    <div class="home_navbar">
        <div class="logo_wrapper">
            <img src={logo} alt="F" class="logo_img" />
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
                            <button on:click={new LoginService().logout} class="logout_button">Logout</button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>

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
