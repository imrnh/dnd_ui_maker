<script lang="ts">
    import { goto } from "$app/navigation";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import google_icon from "$lib/assets/icons/google.png";
    import facebook_icon from "$lib/assets/icons/facebook.png";
    import AuthButtons from "../AuthButtons.svelte";
    import LoginService from "$lib/service/auth/login_service";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/service/auth/firebase";

    var login_service = new LoginService();

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: null,
    };

    var email_field_ref;
    var email_value: string = "";
    var password_field_ref;
    var password_value: string = "";

    var password_reset_request = false;

    function email_field_value_capture(e: any) {
        email_value = e.target.value;
    }

    function password_field_value_capture(e: any) {
        password_value = e.target.value;
        password_reset_request = false;
    }

    function resetPassword(e: any) {
        password_reset_request = true;
    }

    function modal_message_callback(status_code: number, message: string) {
        //show modal
    }

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth_state.authenticated = true;
                auth_state.uid = user.uid;
                auth_state.user_name = user.displayName;
                goto("/"); //redirect to home page.
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;
            }
        });
    });
</script>

<div class="auth_page_wrapper">
    <div class="auth_layout">
        <div class="auth_nav">
            <div class="logo_wrapper">
                <img src={dummy_logo} alt="F" class="logo_img" />
                <p class="logo_name">Fidjet</p>
            </div>
        </div>
    </div>

    <div class="signup_wrapper">
        <h1>Log in</h1>
        <div class="email_input_field_holder">
            <input type="text" class="email_input_field" bind:this={email_field_ref} value={email_value} on:input={email_field_value_capture} placeholder="Email" />
            <input type="password" class="email_input_field" bind:this={password_field_ref} value={password_value} on:input={password_field_value_capture} placeholder="Password" />
        </div>

        {#if !password_reset_request}
            <AuthButtons buttonName={"Continue with email"} callback={() => login_service.emailLogin(email_value, password_value, modal_message_callback)} isRed={true} />
        {:else}
            <AuthButtons buttonName={"Send reset link"} callback={() => login_service.sendResetLink(email_value)} isRed={true} />
        {/if}

        <button class="reset_pass_button" on:click={resetPassword}>Reset password</button>
        <p class="already_have_acc" style="margin-top: 10px;">Don't have an account? <a href="signup">Signup</a></p>

        <div class="horizontal_line" style="margin-top: 120px;" />
        <br /><br />
        <AuthButtons buttonName={"Continue with google"} icon={google_icon} callback={() => login_service.googleLogin(modal_message_callback)} />
        <AuthButtons buttonName={"Continue with facebook"} icon={facebook_icon} callback={() => login_service.facebookLogin(modal_message_callback)} />

        <p class="tos_notice">By clicking “Continue with Email/Google/Facebook” above, you acknowledge that you have read and understood, and agree to Fedjet's <a href="tos">Terms & Conditions</a> and <a href="privacy-policy">Privacy Policy</a></p>
    </div>
</div>

<style>
    @import "../auth.css";
</style>
