<script lang="ts">
    import logo from "$lib/assets/dummy_logo.png";
    import profile_icon from "$lib/assets/icons/profile/space.png";
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    import { goto } from "$app/navigation";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowDown, faArrowRightFromBracket, faBell, faChevronDown, faCircleChevronDown, faSliders } from "@fortawesome/free-solid-svg-icons";
    import LoginService from "$lib/service/auth/login_service";

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

                goto("/auth/login");
            }
        });
    });

    let acc_options_holder: any;
    let acc_option_visible = false;

    function profileIconClickHandler() {
        acc_option_visible = !acc_option_visible;
    }
</script>

<div class="home_layout">
    <div class="home_navbar">
        <div class="navbar_container">
            <a href="/home">
                <div class="logo_wrapper">
                    <img src={logo} alt="F" class="logo_img" />
                    <p class="logo_name">Fidjet</p>
                </div>
            </a>

            <div class="right_side_option_panes">
                <button class="notification_page_view_btn">
                    <FontAwesomeIcon icon={faBell} />
                </button>
                <div class="personal_profile_options_wrapper">
                    {#if auth_state.user_name != null}
                        <button class="personal_acc_options_btn" on:click={profileIconClickHandler}>
                            <div class="button_inner_personal_acc_opts">
                                <img src={profile_icon} alt={auth_state.user_name} />
                                <!-- <p>{auth_state.user_name?.substring(0, 1).toUpperCase() + auth_state.user_name?.substring(1, auth_state.user_name.length)}</p>
                                <FontAwesomeIcon icon={faChevronDown} style="font-size: 15px; margin-left: 20px; " /> -->
                            </div>
                        </button>
                    {/if}

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
    </div>

    <slot />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;0,6..12,1000;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900;1,6..12,1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    :root{
        --bg-color: rgb(255, 252, 252);
        --color: black;
        --violet-color:  rgb(147, 124, 231);
    }

    .home_layout {
        width: 100vw;
        height: auto;
        overflow: auto;
    }
    .home_navbar {
        width: 100vw;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        font-family: "Poppins", sans-serif;
        position: fixed;
        top: 0;
        height: 45px;
        align-items: center;
        /* background-color: rgb(255, 252, 252); */
        /* background-color: black; */
        background-color: var(--bg-color);
        color: var(--color);
        border-bottom: 1px solid rgb(242, 242, 242);
    }

    .navbar_container {
        width: 65%;
        height: 45px;
        position: relative;
        margin-left: 17%;
        margin-top: -40px;
    }

    .personal_acc_options_btn {
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 3px;
        height: 50px;
        width: 50px;
        float: right;
        cursor: pointer;
        /* background-color: rgb(100, 100, 100); */
        background-color: transparent;
        border: 0;
        /* border: 1px solid rgb(200, 200, 200); */
        border-radius: 100px;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
        color: var(--color);
        position: absolute;
        font-size: 18px;
        margin-top: -26px;
        position: absolute;
    }
    .personal_acc_options_btn img{
        width: 33px;
        height: 33px;
    }

    .right_side_option_panes {
        display: flex;
        position: absolute;
        align-items: center;
        right: 17%;
        height: 50px;
        width: 300px;
        padding-top: 10px;
        justify-content: flex-end;
        right: 10%;
        top: 0;
    }

    .notification_page_view_btn {
        width: 40px;
        height: 40px;
        font-size: 20px;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        color: var(--color);
        position: absolute;
        margin-right: 20px;
    }

    .button_inner_personal_acc_opts {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin-top: -2px;
    }

    .personal_profile_options_wrapper {
        z-index: 80;
    }

    .personal_acc_options_holder {
        width: 200px;
        height: auto;
        background-color: rgb(250, 250, 250);
        box-shadow: 1px 3px 5px -2px rgba(194, 194, 194, 0.8);
        -webkit-box-shadow: 1px 3px 5px -2px rgba(194, 194, 194, 0.8);
        -moz-box-shadow: 1px 3px 5px -2px rgba(194, 194, 194, 0.8);
        z-index: 100;
        border-radius: 10px;
        position: absolute;
        margin-top: 37px;
    }

    .option_group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 5px;
        width: 190px;
        height: 30px;
        padding-left: 10px;
    }

    .option_group:hover {
        cursor: pointer;
        background-color: gray;
    }

    .logout_button {
        width: auto;
        height: auto;
        font-size: 13px;
        margin-left: -7px;
        background-color: transparent;
        border: 0;
        margin-top: -5px;
        font-family: "Poppins", sans-serif;
    }

    .acc_sett_button {
        width: auto;
        height: auto;
        font-size: 13px;
        margin-left: -7px;
        background-color: transparent;
        margin-top: 10px;
        border: 0;
        margin-top: -2px;
        font-family: "Poppins", sans-serif;
    }

    .logo_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        position: fixed;
    }

    .logo_img {
        width: 30px;
        height: 30px;
    }

    .logo_name {
        margin-left: 10px;
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 0.01rem;
        /* color: rgb(75, 75, 75); */
        color: var(--color);
       font-family: 'Nunito Sans', sans-serif;
    }

    /* font-family: 'Nunito Sans', sans-serif;
font-family: 'Poppins', sans-serif; */
</style>
