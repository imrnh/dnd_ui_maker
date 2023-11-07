<script lang="ts">
    import SignupService from "$lib/api/auth/signup";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import google_icon from "$lib/assets/icons/google.png";
    import facebook_icon from "$lib/assets/icons/facebook.png";
    import AuthButtons from "../AuthButtons.svelte";

    var singup_service = new SignupService();

    var email_field_ref;
    var email_value: string = "";
    var password_field_ref;
    var password_value: string = "";

    function email_field_value_capture(e: any) {
        email_value = e.target.value;
    }

    function password_field_value_capture(e: any) {
        password_value = e.target.value;
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
        <h1>Sign up</h1>
        <div class="email_input_field_holder">
            <input type="text" class="email_input_field" bind:this={email_field_ref} value={email_value} on:input={email_field_value_capture} placeholder="Email" />
            <input type="password" class="email_input_field" bind:this={password_field_ref} value={password_value} on:input={password_field_value_capture} placeholder="Password" />
        </div>
        <AuthButtons buttonName={"Continue with email"} callback={() => singup_service.emailSignup(email_value, password_value)} isRed={true} /> <br />

        <p class="already_have_acc">Already have an account? <a href="login">Login</a></p>

        <div class="horizontal_line" />
        <br /><br />
        <AuthButtons buttonName={"Continue with google"} icon={google_icon} callback={singup_service.emailSignup} />
        <AuthButtons buttonName={"Continue with facebook"} icon={facebook_icon} callback={singup_service.emailSignup} />

        <p class="tos_notice">By clicking “Continue with Email/Google/Facebook” above, you acknowledge that you have read and understood, and agree to Fedjet's <a href="tos">Terms & Conditions</a> and <a href="privacy-policy">Privacy Policy</a></p>
    </div>
</div>

<style>
    @import "$lib/assets/css/auth.css";
</style>
