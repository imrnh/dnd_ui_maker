<script lang="ts">
    import SignupService from "$lib/api/auth/signup";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import google_icon from "$lib/assets/icons/google.png";
    import facebook_icon from "$lib/assets/icons/facebook.png";
    import AuthButtons from "../AuthButtons.svelte";
    /**
     *
     * firebase setup
     */
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";

    const firebaseConfig = {
        apiKey: "AIzaSyC6-vHmFlnp_gIAo-8PvVDt-zLp_89v7mI",
        authDomain: "startup-fidget-io.firebaseapp.com",
        projectId: "startup-fidget-io",
        storageBucket: "startup-fidget-io.appspot.com",
        messagingSenderId: "763925514392",
        appId: "1:763925514392:web:086ca46b931ecb89dc28ed",
        measurementId: "G-1C3JWMPYBY",
    };

    const app = initializeApp(firebaseConfig);

    /**
     * other logical stuffs
     */
    var singup_service = new SignupService();

    var email_field_ref;
    var email_value: string = "";
    var password_field_ref;
    var password_value: string = "";

    var password_reset_request = false;

    function email_field_value_capture(e: any) {
        email_value = e.target.value;
        console.log(email_value);
    }

    function password_field_value_capture(e: any) {
        password_value = e.target.value;
        password_reset_request = false;
        console.log(password_value);
    }

    function resetPassword(e: any) {
        password_reset_request = true;
    }
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
            <AuthButtons buttonName={"Continue with email"} callback={() => singup_service.emailSignup(email_value, password_value)} isRed={true} />
        {:else}
            <AuthButtons buttonName={"Send reset link"} callback={()=>singup_service.sendResetLink(email_value)} isRed={true} />
        {/if}

        <button class="reset_pass_button" on:click={resetPassword}>Reset password</button>
        <p class="already_have_acc" style="margin-top: 10px;">Don't have an account? <a href="signup">Signup</a></p>

        <div class="horizontal_line" style="margin-top: 120px;" />
        <br /><br />
        <AuthButtons buttonName={"Continue with google"} icon={google_icon} callback={singup_service.emailSignup} />
        <AuthButtons buttonName={"Continue with facebook"} icon={facebook_icon} callback={singup_service.emailSignup} />

        <p class="tos_notice">By clicking “Continue with Email/Google/Facebook” above, you acknowledge that you have read and understood, and agree to Fedjet's <a href="tos">Terms & Conditions</a> and <a href="privacy-policy">Privacy Policy</a></p>
    </div>
</div>

<style>
    @import "$lib/assets/css/auth.css";
</style>
