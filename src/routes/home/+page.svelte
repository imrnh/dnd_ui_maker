<script lang="ts">
    import app, { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { faAdd, faArrowRightFromBracket, faBell, faCircleChevronDown, faSliders } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    import app_image from "$lib/assets/images/app-view-cover.png";
    import { goto } from "$app/navigation";

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

    let apps = [
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
        { uid: "239ij-9iff-3993924k-3ekfisd9-3adeff", name: "Log Workout Gym Scheduler", last_modified: 5, cover_img: app_image },
    ]; //last_modified will be date actually

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

<div class="home_wrapper">
    <div class="home_navbar">
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

    <section class="app_view_section">
        <div class="app_view_header">
            <h1>All Apps</h1>
        </div>
        <div style="background-color: #dadada; width: 100%; height: 1px; margin-top:10px;margin-bottom: 10px;" />
        <div class="app_view_body">
            <div class="create_new_app_card">
                <button on:click={() => goto("/app/create-app")}
                    ><FontAwesomeIcon icon={faAdd} />
                    <p>Create a new app</p>
                </button>
            </div>
        </div>

        <!-- created apps view -->
        <div class="app_view_cards_holder">
            {#each apps as app}
                <a href={`/app?appid=${app.uid}`} style="text-decoration: none; color: black;">
                    <div class="app_view_card">
                        <img src={app.cover_img} alt="" />
                        <p class="app_title_p">{app.name}</p>
                        <p class="app_last_edited">Edited {app.last_modified} ago</p>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    @import "$lib/assets/css/home.css";
</style>
